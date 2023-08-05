export type BackgroundName = 'solid' |
'gradient' |
'sunset' | 
'flux' | 
'rainbow'

export type BackgroundType = {
  name: BackgroundName;
}[]

export const backgrounds: BackgroundType = [
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