export interface UserFormData {
  username: string;
  email: string;
  fullName: string;
  position: string;
  bio: string;
  avatar: string;
  github: string;
  gitlab: string;
  phone: string;
  birthDate: string;
  experience: string;
  education: string;
}

export interface FormSectionProps {
  formData: UserFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
