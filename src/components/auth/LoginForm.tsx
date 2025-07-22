'use client'
import { useActionState } from 'react'
import { authenticate } from '@/lib/actions/authenticate' // ServerAction
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {

    const [errorMessage, formAction,isPending] = useActionState(
    authenticate,
    undefined,
    );

    return ( 
    <Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent>
            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input type="email" name="email" id="email" required />
                </div>
                <div>
                    <Label htmlFor="password">パスワード</Label>
                    <Input type="password" name="password" id="password" required />
                </div>
                <Button type="submit" className="w-full">
                    {isPending ? 'ログイン中...' : 'ログイン'}
                </Button>
                
                <div className="flex h-8 items-end space-x-1">
                    {errorMessage && (
                        <div className=" text-red-500">
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </div>
                    )}
                </div>    
            </form>
        </CardContent>
        <CardFooter></CardFooter>
    </Card>)
}