'use client'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBox() {
    const [ search, setSearch ] = useState('')
    const [ debouncedSearch, setDebouncedSearch ] = useState('')
    const router = useRouter()

    // デバウンス(高頻度に呼び出されるのを防ぐ　500ms後に実行)
    // useEffectの中でsetTimeoutを使って、一定時間後にdebouncedSearchを更新
    useEffect(()=>{
        const timer = setTimeout(()=> {
            setDebouncedSearch(search)
        }, 500)
        
        return () => clearTimeout(timer)

    }, [search])
    
    // debouncedSearchが更新されたら実行
    useEffect(()=>{
        if(debouncedSearch.trim()){
            router.push(`/?search=${debouncedSearch.trim()}`)
        } else {
            router.push('/')
        }

    }, [debouncedSearch, router])

  return (
    <>
    <Input
        placeholder="記事を検索..."
        className="w-[200px] lg:w-[300px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
    </>
  )
}