export type DoctroContactInformation_t = {
   email: string
   phone: string
   address: {
      representation: string
      latitude: number
      longitude: number
   }
}

export type Doctor_t = {
   id: string

   dateCreated: number
   dateUpdated: number
   isVerified: boolean

   dp: string
   name: string
   role: string

   profile: {
      specialization: string
      education: string
      experience: string
      awards: string[]
      languages: string[]
      availability: {
         days: string[]
         hours: string
      }
   }

   contactInformation: DoctroContactInformation_t
}
