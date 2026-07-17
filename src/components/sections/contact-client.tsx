"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/types/dictionary";

interface ContactClientProps {
  dict: Dictionary["contact"];
  lang: string;
}

export function ContactClient({ dict, lang }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contact: "",
    websiteType: "",
    package: "",
    message: "",
    websiteUrl: "", // Honeypot field
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Bot validation: if honeypot field is filled, silently ignore and mock success
    if (formData.websiteUrl) {
      setStatus("success");
      setFormData({ name: "", company: "", contact: "", websiteType: "", package: "", message: "", websiteUrl: "" });
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          contact: formData.contact,
          websiteType: formData.websiteType,
          package: formData.package,
          message: formData.message,
          lang,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", company: "", contact: "", websiteType: "", package: "", message: "", websiteUrl: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <>
      <section className="pt-36 pb-16 bg-gradient-to-br from-garapin-navy to-garapin-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold mb-4">
            {dict.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-garapin-light">
            {dict.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-garapin-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 bg-white rounded-2xl p-8 border border-garapin-border"
            >
              {/* Honeypot field (hidden from human users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_url">Website URL</label>
                <input
                  type="text"
                  id="website_url"
                  name="website_url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-garapin-navy mb-1.5">{dict.form.name} *</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={dict.form.name_placeholder}
                    className="w-full px-4 py-2.5 rounded-lg border border-garapin-border bg-white text-garapin-navy placeholder:text-garapin-light focus:outline-none focus:ring-2 focus:ring-garapin-orange focus:border-transparent transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-garapin-navy mb-1.5">{dict.form.company}</label>
                  <input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={dict.form.company_placeholder}
                    className="w-full px-4 py-2.5 rounded-lg border border-garapin-border bg-white text-garapin-navy placeholder:text-garapin-light focus:outline-none focus:ring-2 focus:ring-garapin-orange focus:border-transparent transition-all text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-garapin-navy mb-1.5">{dict.form.contact} *</label>
                <input
                  required
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder={dict.form.contact_placeholder}
                  className="w-full px-4 py-2.5 rounded-lg border border-garapin-border bg-white text-garapin-navy placeholder:text-garapin-light focus:outline-none focus:ring-2 focus:ring-garapin-orange focus:border-transparent transition-all text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-garapin-navy mb-1.5">{dict.form.website_type} *</label>
                  <select
                    required
                    value={formData.websiteType}
                    onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-garapin-border bg-white text-garapin-navy focus:outline-none focus:ring-2 focus:ring-garapin-orange focus:border-transparent transition-all text-sm"
                  >
                    <option value="" disabled>{dict.form.website_type_placeholder}</option>
                    {Object.entries(dict.form.website_options).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-garapin-navy mb-1.5">{dict.form.package} *</label>
                  <select
                    required
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-garapin-border bg-white text-garapin-navy focus:outline-none focus:ring-2 focus:ring-garapin-orange focus:border-transparent transition-all text-sm"
                  >
                    <option value="" disabled>{dict.form.package_placeholder}</option>
                    {Object.entries(dict.form.package_options).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-garapin-navy mb-1.5">{dict.form.message}</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={dict.form.message_placeholder}
                  className="w-full px-4 py-2.5 rounded-lg border border-garapin-border bg-white text-garapin-navy placeholder:text-garapin-light focus:outline-none focus:ring-2 focus:ring-garapin-orange focus:border-transparent transition-all text-sm resize-none"
                />
              </div>

              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? (
                  <><Loader2 className="mr-2 animate-spin" size={18} />{dict.form.sending}</>
                ) : (
                  <><Send className="mr-2" size={18} />{dict.form.submit}</>
                )}
              </Button>

              {status === "success" && (
                <div className="mt-4 flex items-center gap-2 text-garapin-success text-sm">
                  <CheckCircle size={16} /> {dict.form.success}
                </div>
              )}
              {status === "error" && (
                <div className="mt-4 flex items-center gap-2 text-red-500 text-sm">
                  <XCircle size={16} /> {dict.form.error}
                </div>
              )}
            </motion.form>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 border border-garapin-border">
                <h3 className="text-lg font-semibold text-garapin-navy mb-6">{dict.info_title}</h3>
                <div className="space-y-5">
                  <a
                    href="https://wa.me/6285283886884"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-garapin-orange-muted text-garapin-orange flex items-center justify-center group-hover:bg-garapin-orange group-hover:text-white transition-all">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-garapin-gray">{dict.info_wa}</div>
                      <div className="text-sm font-medium text-garapin-navy">0852-8388-6884</div>
                    </div>
                  </a>
                  <a
                    href="mailto:hello@garapin.id"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-garapin-orange-muted text-garapin-orange flex items-center justify-center group-hover:bg-garapin-orange group-hover:text-white transition-all">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-garapin-gray">{dict.info_email}</div>
                      <div className="text-sm font-medium text-garapin-navy">hello@garapin.id</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-garapin-orange-muted text-garapin-orange flex items-center justify-center">
                      <Clock size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-garapin-gray">{dict.info_response}</div>
                      <div className="text-sm font-medium text-garapin-navy">{dict.info_response_text}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}