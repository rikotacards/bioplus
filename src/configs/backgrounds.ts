export type BackgroundName = 'solid' |
'gradient' |
'sunset' | 
'flux' | 
'rainbow'| 
'default'|
'customImage'

export type BackgroundType = {
  name: BackgroundName;
}[]

export const backgrounds: BackgroundType = [
  {
    name: 'default'
  },
  {
    name: 'solid',

  },
  {
    name: 'gradient',

  },
  {
    name: 'sunset',
  
  },
  {
    name: 'flux'
  },
  {
    name: 'rainbow'
  }
]