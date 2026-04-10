import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader, SaveBtn, FieldLabel, Spinner } from "./adminShared";
import { SETTINGS_SECTIONS } from "./adminTypes";

export function SettingsPanel({
  sectionId,
  settings,
  onUpdate,
  onSave,
  saving,
  saved,
  loading,
}: {
  sectionId: string;
  settings: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
  loading: boolean;
}) {
  const section = SETTINGS_SECTIONS.find((s) => s.id === sectionId)!;

  return (
    <div>
      <SectionHeader
        title={section.title}
        icon={section.icon}
        action={<SaveBtn saving={saving} saved={saved} onClick={onSave} />}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-2xl border border-border p-6 space-y-5 max-w-2xl">
          {section.fields.map((field) => (
            <div key={field.key}>
              <FieldLabel>{field.label}</FieldLabel>
              {field.multiline ? (
                <Textarea value={settings[field.key] ?? ""} onChange={(e) => onUpdate(field.key, e.target.value)} rows={3} />
              ) : (
                <Input value={settings[field.key] ?? ""} onChange={(e) => onUpdate(field.key, e.target.value)} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
