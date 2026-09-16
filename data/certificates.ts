export type Certificate={title:string;issuer:string;date:string;description:string;image?:string;pdf?:string;url?:string;published:boolean};
export const certificates:Certificate[]=["Academic Achievement","Research Workshop","Volunteer Recognition","Seminar Participation"].map(title=>({title,issuer:"Add later",date:"Add later",description:"Add verified details here.",published:false}));
