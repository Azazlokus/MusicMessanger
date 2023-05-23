 export interface User {
     name: string
     avatar: string
 }

 export interface Post {
     user: User
     text: string
     image?: []
 }