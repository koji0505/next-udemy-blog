'use client'
import { useActionState } from 'react'
// import { authenticate } from '@/lib/actions/authenticate' // ServerAction
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
import { createUser } from '@/lib/actions/createuser' // ServerAction
// import { type } from '../../../../next-udemy-basic/src/generated/prisma/index';

export default function RegisterForm() {
    const [state, formAction] = useActionState(createUser, {
    success: false, errors: {}
    });

    return (
        <Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle>ユーザー登録</CardTitle>
        </CardHeader>
        <CardContent>
            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">名前</Label>
                    <Input type="text" name="name" id="name" required />
                    {state.errors.email && (
                        <p className="text-red-500 text-sm">{state.errors.name.join(',')}</p>) }
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input type="text" name="email" id="email" required />
                    {state.errors.email && (
                        <p className="text-red-500 text-sm">{state.errors.email.join(',')}</p>) }
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">パスワード</Label>
                    <Input type="password" name="password" id="password" required />
                    {state.errors.password && (
                        <p className="text-red-500 text-sm">{state.errors.password.join(',')}</p>) }
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">パスワード(確認)</Label>
                    <Input type="password" name="confirmPassword" id="" required />
                    {state.errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{state.errors.confirmPassword.join(',')}</p>) }
                </div>
                <Button type="submit" className="w-full">
                    登録
                </Button>
            </form>
        </CardContent>
        <CardFooter></CardFooter>
       </Card>
       )  
}