type level = {
  levelTitle: string;
  levelRating: number;
};

export interface SkillCardInterface {
  courseTitle: string;
  courseRating: number;
  levels: level[];
  courseCertificate: string;
}
