export type BackgroundName = 'solid' |
'gradient' |
'sunset' | 
'flux' | 
'rainbow'| 
'default'|
'customImage'

export type BackgroundType = {
  name: BackgroundName;
  isPremium: boolean;
}[]

export const backgrounds: BackgroundType = [
  {
    name: 'solid',
    isPremium: false

  },
  {
    name: 'gradient',
    isPremium: false


  },
  {
    name: 'sunset',
    isPremium: true

  
  },
  {
    name: 'flux',
    isPremium: true

  },
  {
    name: 'rainbow',
    isPremium: true
  }
]