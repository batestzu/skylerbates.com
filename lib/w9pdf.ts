import { PDFDocument, PDFTextField, PDFCheckBox, StandardFonts, rgb } from "pdf-lib";

export interface W9Data {
  name: string;
  businessName?: string;
  taxClassification:
    | "individual"
    | "ccorp"
    | "scorp"
    | "partnership"
    | "trust"
    | "llc"
    | "other";
  llcClassification?: string; // C, S, or P (required when taxClassification is "llc")
  otherClassification?: string;
  exemptPayeeCode?: string;
  fatcaCode?: string;
  address: string;
  cityStateZip: string;
  tinType: "ssn" | "ein";
  tin: string; // XXX-XX-XXXX or XX-XXXXXXX
  signature: string; // typed full legal name
  date: string; // MM/DD/YYYY
}

// Field names in the official IRS fw9.pdf (Rev. March 2024) AcroForm
const F = "topmostSubform[0].Page1[0]";
const BOXES = `${F}.Boxes3a-b_ReadOrder[0]`;

// Index into the c1_1 checkbox group for each classification
const CLASSIFICATION_INDEX: Record<W9Data["taxClassification"], number> = {
  individual: 0,
  ccorp: 1,
  scorp: 2,
  partnership: 3,
  trust: 4,
  llc: 5,
  other: 6,
};

// Blue ink for everything we add to the form ("print in blue")
const BLUE = rgb(0, 0, 1);
const BLUE_DA = "/Helv 9 Tf 0 0 1 rg";

/**
 * Fill the official IRS W-9 with contractor data rendered in blue, flatten,
 * and return the PDF bytes. Everything happens in memory — nothing is stored.
 */
export async function generateW9Pdf(templateBytes: ArrayBuffer, data: W9Data): Promise<Uint8Array> {
  const doc = await PDFDocument.load(templateBytes);
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const form = doc.getForm();

  function setText(name: string, value: string | undefined) {
    if (!value) return;
    const field = form.getField(name) as PDFTextField;
    field.setText(value);
    // Set the default appearance to blue before regenerating appearances, so
    // pdf-lib keeps the color operator when it appends the font instruction.
    field.acroField.setDefaultAppearance(BLUE_DA);
    field.updateAppearances(helvetica);
  }

  function check(name: string) {
    const field = form.getField(name) as PDFCheckBox;
    field.check();
    field.acroField.setDefaultAppearance(BLUE_DA);
    field.updateAppearances();
  }

  setText(`${F}.f1_01[0]`, data.name);
  setText(`${F}.f1_02[0]`, data.businessName);

  check(`${BOXES}.c1_1[${CLASSIFICATION_INDEX[data.taxClassification]}]`);
  if (data.taxClassification === "llc") {
    setText(`${BOXES}.f1_03[0]`, data.llcClassification?.toUpperCase());
  }
  if (data.taxClassification === "other") {
    setText(`${BOXES}.f1_04[0]`, data.otherClassification);
  }

  setText(`${F}.f1_05[0]`, data.exemptPayeeCode);
  setText(`${F}.f1_06[0]`, data.fatcaCode);
  setText(`${F}.Address_ReadOrder[0].f1_07[0]`, data.address);
  setText(`${F}.Address_ReadOrder[0].f1_08[0]`, data.cityStateZip);
  // Requester's name (optional box on the right of Line 5/6)
  setText(`${F}.f1_09[0]`, "432 Intelligence Inc DBA VibeWithUS Entertainment");

  // TIN boxes are split into segments on the form
  const digits = data.tin.replace(/\D/g, "");
  if (data.tinType === "ssn") {
    setText(`${F}.f1_11[0]`, digits.slice(0, 3));
    setText(`${F}.f1_12[0]`, digits.slice(3, 5));
    setText(`${F}.f1_13[0]`, digits.slice(5, 9));
  } else {
    setText(`${F}.f1_14[0]`, digits.slice(0, 2));
    setText(`${F}.f1_15[0]`, digits.slice(2, 9));
  }

  form.flatten();

  // Signature and date are not form fields — draw them on the signature line
  const page = doc.getPage(0);
  page.drawText(data.signature, {
    x: 160,
    y: 200,
    size: 12,
    font: helvetica,
    color: BLUE,
  });
  page.drawText(data.date, {
    x: 455,
    y: 200,
    size: 12,
    font: helvetica,
    color: BLUE,
  });

  // Only page 1 is the actual form — drop the IRS instruction pages so the
  // printer doesn't churn out five pages of boilerplate per submission.
  const trimmed = await PDFDocument.create();
  const [firstPage] = await trimmed.copyPages(doc, [0]);
  trimmed.addPage(firstPage);
  return trimmed.save();
}
