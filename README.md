# skeleton-loading-react

> A react library for generating custom skeleton loading components automatically

[![NPM](https://img.shields.io/npm/v/react-skeleton-loading.svg)](https://www.npmjs.com/package/react-skeleton-loading) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install skeleton-loading-react
```

## Basic Usage 

Just pass the component you want to load as a children to the Skeleton component. 
If the children is receiving any props, you should also pass an `exampleProps` prop, which is an object with the same props that your component receives, 
that will be used to determine, for example, the length of the texts. Notice that it is important to import the css aswell.

Here is a basic example: 
```
import {Skeleton} from 'skeleton-loading-react'
import "skeleton-loading-react/dist/index.css"

import {UserCard} from '../Components/UserCard'

//This mimics a delay from the api
const [isLoading, setIsLoading] = useState(true)
useEffect(()=>{
  setTimeout(()=>{
    setIsLoading(false)
  },2000)
},[])

//imagine this data is coming from an api
const user = {
  name: 'Filipe Pfluck',
  avatar: 'https://avatars.githubusercontent.com/u/62773200?v=4',
  description: 'Fullstack developer focused in typescript.'
}

//Now let's create an example user:
const fakeUser = {
  name: 'Joe Doe',
  avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
}

...

return(
  <Skeleton
    isLoading={isLoading}
    exampleProps={{user: fakeUser}}
  >
    <UserCard user={user}/>
  </Skeleton>
)
```

![GIF example](https://github.com/FilipePfluck/react-skeleton-loading/blob/main/skeleton.gif)

## Documentation 

The skeleton component accepts the following props: 
- isLoading: boolean
- exampleProps: any object (should have the same props that your component receives)
- defaultStyles: CSSProperties (those will be added to every element considered as content, in other words, the ones that have a background)
- className: string (will be added to the same elements as above)

## Considerations

If you want to change the background, it is done through the background-image property.
This is the default background: 
```
background-image: linear-gradient(
    -90deg,
    #28262E 0%,
    #605e67 50%,
    #28262E 100%
);
background-size: 400% 400%;
```
You can change it passing `defaultStyles`, `className`, or even styling it other way, such as using styled-components

## Limitations

- For now, you can only pass a Component as children to the Skeleton component. If you want to just pass some HTML, please encapsulate it in a component first.
- You can only pass one level of components, if you pass a component with a child, it wont work right now.

Instead of this:
```
<Skeleton>
  <ComponentA {someProps}>
    <ComponentB {moreProps}/>
  </ComponentA>
</Skeleton>
```

try this:
```
const Wrapper = ({someProps, moreProps}) => {
  <ComponentA {someProps}>
    <ComponentB {moreProps}/>
  </ComponentA>
}
...
<Skeleton>
  <Wrapper someProps={...} moreProps={...}>
</Skeleton>
```

## License

MIT © [FilipePfluck](https://github.com/FilipePfluck)
