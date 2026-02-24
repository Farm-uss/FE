interface FormSectionProps {
  label: string;
  children: React.ReactNode;
}

const FormSection = ({ label, children }: FormSectionProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
      <span className="text-h-18b text-[#20110A] shrink-0">{label}</span>
      <div className="flex-1 h-px bg-[#8B8880]" />
    </div>
    {children}
  </div>
);

export default FormSection;
