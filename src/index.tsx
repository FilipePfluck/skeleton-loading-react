import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  Fragment,
  // eslint-disable-next-line
  CSSProperties,
  // eslint-disable-next-line
  ReactElement
  /* FC, */
} from 'react'
import styles from './styles.module.css'

export interface SkeletonProps /* <T> */ {
  children: React.ReactNode
  isLoading: boolean
  exampleProps: any
  defaultStyles?: CSSProperties
  className?: string
  mainColor?: string
  accentColor?: string
  angle?: string
}

interface SkeletonProviderProps {
  mainColor?: string
  accentColor?: string
  angle?: string
}

interface SkeletonContextData {
  _mainColor?: string
  _accentColor?: string
  _angle?: string
}

const SkeletonContext = createContext({} as SkeletonContextData)

export const SkeletonProvider: React.FC<SkeletonProviderProps> = ({
  children,
  mainColor,
  accentColor,
  angle
}) => {
  return (
    <SkeletonContext.Provider
      value={{
        _mainColor: mainColor,
        _accentColor: accentColor,
        _angle: angle
      }}
    >
      {children}
    </SkeletonContext.Provider>
  )
}

export const Skeleton = /* <T extends unknown> */ (
  {
    children,
    isLoading,
    exampleProps = {},
    defaultStyles = {},
    className,
    mainColor,
    accentColor,
    angle
  }: SkeletonProps /* <T> */
): ReactElement | null => {
  const fakeComponentRef = useRef<HTMLDivElement>(null)

  const [show, setShow] = useState(false)

  const { _accentColor, _angle, _mainColor } = useContext(SkeletonContext)

  const __accentColor = accentColor || _accentColor || '#28282C'
  const __angle = angle || _angle || '-90deg'
  const __mainColor = mainColor || _mainColor || '#1C1C1F'

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 1)
  })

  const texts = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong']
  const contents = ['img', 'video', 'button', 'input', 'textarea', 'select']

  const styleProps = [
    'borderRadius',
    'padding',
    'margin',
    'marginRight',
    'marginLeft',
    'marginTop',
    'marginBottom',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'display',
    'alignItems',
    'justifyContent',
    'flexDirection',
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridGap',
    'columnGap',
    'rowGap',
    'gap',
    'gridTemplateAreas',
    'marginBlockStart',
    'marginBlockEnd'
  ]

  const renderElement = (element: HTMLElement) => {
    const object = {}
    styleProps.forEach((s) => Object.assign(object, { [s]: element.style[s] }))

    if (element.localName === 'header') {
      console.log(object)
    }

    if (texts.includes(element.localName)) {
      const fontSize = +document
        .defaultView!.getComputedStyle(element, null)
        .fontSize.replace('px', '')
      const lineHeight =
        +document
          .defaultView!.getComputedStyle(element, null)
          .lineHeight.replace('px', '') |
        (fontSize * 1.2)
      const numberOfLines = Math.round(element.offsetHeight / lineHeight)
      const lineMarginBottom = lineHeight - fontSize

      const lines = []

      for (let i = 0; i < numberOfLines; i++) {
        lines.push(i)
      }

      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {lines.map((line) => (
            <div
              style={{
                width: element.offsetWidth,
                backgroundImage: `linear-gradient(
                    ${__angle},
                    ${__mainColor} 0%,
                    ${__accentColor} 50%,
                    ${__mainColor} 100%
                )`,
                ...object,
                ...defaultStyles,
                height: fontSize,
                marginBottom: lineMarginBottom
              }}
              className={`${styles.shimmer} ${className}`}
              key={'line' + line}
            />
          ))}
        </div>
      )
    }

    if (contents.includes(element.localName)) {
      return (
        <div
          style={{
            width: element.offsetWidth,
            height: element.offsetHeight,
            backgroundImage: `linear-gradient(
                ${__angle},
                ${__mainColor} 0%,
                ${__accentColor} 50%,
                ${__mainColor} 100%
            )`,
            ...object,
            ...defaultStyles
          }}
          className={`${styles.shimmer} ${className}`}
        />
      )
    }

    return (
      <div
        style={{
          width: element.offsetWidth,
          height: element.offsetHeight,
          ...object
        }}
      >
        {element.children
          ? Array.from(element.children).map((child) =>
              renderElement(child as HTMLElement)
            )
          : null}
      </div>
    )
  }

  return (
    <Fragment>
      <div
        style={isLoading ? { visibility: 'hidden', position: 'absolute' } : {}}
        ref={fakeComponentRef}
      >
        {
          // @ts-ignore
          typeof children === 'object' && children?.props
            ? {
                ...children,
                props: isLoading
                  ? exampleProps
                  : // @ts-ignore
                    children?.props || {}
              }
            : children
        }
      </div>
      {show &&
        isLoading &&
        renderElement(fakeComponentRef.current as HTMLDivElement)}
    </Fragment>
  )
}
