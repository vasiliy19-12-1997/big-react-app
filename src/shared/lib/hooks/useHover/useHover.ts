import { useCallback, useMemo, useState } from "react"
interface useHoverFunc {
    onMouseLeave:()=>void
    onMouseEnter:()=>void
}
type useHoverType = [boolean, useHoverFunc]
export const useHover= ()=>{
    const [isHover, setIsHover] = useState(false)
    const onMouseLeave = useCallback(()=>{
        setIsHover(false)
    },[])
    const onMouseEnter = useCallback(()=>{
        setIsHover(true)
    },[])
    return useMemo(()=> [isHover, {onMouseLeave, onMouseEnter}],
       [isHover, onMouseLeave, onMouseEnter])
}