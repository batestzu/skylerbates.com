"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Step = "form" | "loading" | "success";

const CLASSIFICATIONS = [
  { value: "individual", label: "Individual / sole proprietor" },
  { value: "ccorp", label: "C corporation" },
  { value: "scorp", label: "S corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "trust", label: "Trust / estate" },
  { value: "llc", label: "LLC" },
  { value: "other", label: "Other" },
];

const CERTIFICATION_ITEMS = [
  "The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and",
  "I am not subject to backup withholding because (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subject to backup withholding; and",
  "I am a U.S. citizen or other U.S. person (defined in the Form W-9 instructions); and",
  "The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.",
];

export default function DocsPage() {
  const [step, setStep] = useState<Step>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    accessCode: "",
    name: "",
    businessName: "",
    taxClassification: "",
    llcClassification: "",
    otherClassification: "",
    exemptPayeeCode: "",
    fatcaCode: "",
    address: "",
    cityStateZip: "",
    tinType: "ssn",
    tin: "",
    signature: "",
    certified: "",
  });

  function update(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setStep("loading");
    try {
      const res = await fetch("/api/docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Something went wrong.");
      setStep("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("form");
    }
  }

  const inputClass =
    "w-full bg-transparent border border-[rgba(245,240,235,0.12)] px-4 py-3 text-[#F5F0EB] text-sm font-[family-name:var(--font-inter)] placeholder:text-[#F5F0EB]/20 focus:outline-none focus:border-[#C2185B] transition-colors";
  const labelClass =
    "block text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/40 mb-2 font-[family-name:var(--font-inter)]";

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.3em] text-[#C2185B] mb-3 font-[family-name:var(--font-inter)]"
        >
          Contractor Documents
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,7vw,5rem)] font-light text-[#F5F0EB] leading-tight mb-4"
        >
          Form W-9
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="h-px w-24 bg-[#C2185B] mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-[#F5F0EB]/70 font-[family-name:var(--font-inter)] text-sm leading-relaxed mb-4 max-w-xl"
        >
          Submit your W-9 for 432 Intelligence Inc DBA VibeWithUS Entertainment. Your
          information is placed onto the official IRS Form W-9 and delivered directly —
          this site keeps nothing.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs text-[#D4AF37] font-[family-name:var(--font-inter)] leading-relaxed mb-12 max-w-xl border border-[#D4AF37]/30 px-4 py-3"
        >
          Nothing is stored — your form is converted to PDF in memory and sent straight to
          the recipient&apos;s printer. It is never saved to a database, disk, or log.
        </motion.p>

        {step === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C2185B]/15 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#C2185B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[#F5F0EB] mb-3">
              W-9 sent to the printer
            </h2>
            <p className="text-sm text-[#F5F0EB]/50 font-[family-name:var(--font-inter)] max-w-sm mx-auto">
              Your W-9 was generated and delivered. No copy of your information remains on
              this site.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Access code */}
            <div>
              <label className={labelClass}>Access code *</label>
              <input
                type="text"
                required
                autoComplete="off"
                value={formData.accessCode}
                onChange={(e) => update("accessCode", e.target.value)}
                placeholder="Provided by Skyler"
                className={inputClass}
              />
            </div>

            {/* Name + Business name */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Name of individual / entity *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Jane Smith"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Business / disregarded entity name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder="If different from above"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Tax classification */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Federal tax classification *</label>
                <select
                  required
                  value={formData.taxClassification}
                  onChange={(e) => update("taxClassification", e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-[#0e0a0c]">Select…</option>
                  {CLASSIFICATIONS.map((c) => (
                    <option key={c.value} value={c.value} className="bg-[#0e0a0c]">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              {formData.taxClassification === "llc" && (
                <div>
                  <label className={labelClass}>LLC tax classification *</label>
                  <select
                    required
                    value={formData.llcClassification}
                    onChange={(e) => update("llcClassification", e.target.value)}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-[#0e0a0c]">Select…</option>
                    <option value="C" className="bg-[#0e0a0c]">C — C corporation</option>
                    <option value="S" className="bg-[#0e0a0c]">S — S corporation</option>
                    <option value="P" className="bg-[#0e0a0c]">P — Partnership</option>
                  </select>
                </div>
              )}
              {formData.taxClassification === "other" && (
                <div>
                  <label className={labelClass}>Other classification *</label>
                  <input
                    type="text"
                    required
                    value={formData.otherClassification}
                    onChange={(e) => update("otherClassification", e.target.value)}
                    placeholder="See W-9 instructions"
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            {/* Exemptions (optional) */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Exempt payee code (if any)</label>
                <input
                  type="text"
                  value={formData.exemptPayeeCode}
                  onChange={(e) => update("exemptPayeeCode", e.target.value)}
                  placeholder="Usually blank"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>FATCA exemption code (if any)</label>
                <input
                  type="text"
                  value={formData.fatcaCode}
                  onChange={(e) => update("fatcaCode", e.target.value)}
                  placeholder="Usually blank"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Address */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Address (number, street, apt) *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="123 River St"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>City, state, and ZIP code *</label>
                <input
                  type="text"
                  required
                  value={formData.cityStateZip}
                  onChange={(e) => update("cityStateZip", e.target.value)}
                  placeholder="North Augusta, SC 29841"
                  className={inputClass}
                />
              </div>
            </div>

            {/* TIN */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Taxpayer identification number *</label>
                <select
                  value={formData.tinType}
                  onChange={(e) => {
                    update("tinType", e.target.value);
                    update("tin", "");
                  }}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="ssn" className="bg-[#0e0a0c]">Social Security Number (SSN)</option>
                  <option value="ein" className="bg-[#0e0a0c]">Employer ID Number (EIN)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>
                  {formData.tinType === "ssn" ? "SSN *" : "EIN *"}
                </label>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  autoComplete="off"
                  value={formData.tin}
                  onChange={(e) => update("tin", e.target.value)}
                  placeholder={formData.tinType === "ssn" ? "XXX-XX-XXXX" : "XX-XXXXXXX"}
                  pattern={formData.tinType === "ssn" ? "\\d{3}-?\\d{2}-?\\d{4}" : "\\d{2}-?\\d{7}"}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Certification */}
            <div className="border border-[rgba(245,240,235,0.12)] p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/40 mb-3 font-[family-name:var(--font-inter)]">
                Certification — under penalties of perjury, I certify that:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[#F5F0EB]/60 font-[family-name:var(--font-inter)] leading-relaxed mb-4">
                {CERTIFICATION_ITEMS.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.certified === "yes"}
                  onChange={(e) => update("certified", e.target.checked ? "yes" : "")}
                  className="mt-0.5 accent-[#C2185B]"
                />
                <span className="text-xs text-[#F5F0EB]/70 font-[family-name:var(--font-inter)]">
                  I certify the statements above and understand that typing my name below
                  constitutes my electronic signature.
                </span>
              </label>
            </div>

            {/* Signature */}
            <div>
              <label className={labelClass}>Signature (type your full legal name) *</label>
              <input
                type="text"
                required
                value={formData.signature}
                onChange={(e) => update("signature", e.target.value)}
                placeholder="Jane Smith"
                className={`${inputClass} font-[family-name:var(--font-cormorant)] text-xl italic`}
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 font-[family-name:var(--font-inter)]">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={step === "loading"}
              className="w-full py-4 bg-[#C2185B] text-[#F5F0EB] text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-inter)] font-medium hover:bg-[#a01048] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {step === "loading" ? "Generating and sending…" : "Submit W-9"}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
