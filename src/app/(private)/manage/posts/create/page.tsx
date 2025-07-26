'use client'
import React, { useState, useActionState } from "react";
import {createPost} from "@/lib/actions/createPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreatePage() {

    const [content, setContent] = useState("") // 記事の文章
    const [contentLength, setContentLength] = useState(0) // 文字数
    const [preview, setPreview] = useState(false) // プレビュー

    const [state, formAction] = useActionState(createPost, {
        success: false, errors: {}
        });
    
    const handleContentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setContentLength(e.target.value.length);
    };
    
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-10">
                新規記事投稿(Markdown対応)
            </h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <Label htmlFor="title">タイトル</Label>
                    <input className="ml-2 border w-full" type="text" id="title" name="title" placeholder="タイトルを入力してください"/>
                    {state.errors.title && (
                        <p className="text-red-500 text-sm">{state.errors.title.join(',')}</p>) }
                </div>
                
                <div>
                    <Label htmlFor="topImage">トップ画像</Label>
                    <Input
                    type="file"
                    id="topImage"
                    accept="image/*"
                    name="topImage"
                    />
                    {state.errors.topImage && (
                        <p className="text-red-500 text-sm">{state.errors.topImage.join(',')}</p>) }
                </div>
                
               <div>
                    <Label htmlFor="content">内容(Markdown)</Label>
                    <TextareaAutosize
                        id="content"
                        name="content"
                        className="w-full border p-2"
                        placeholder="Markdown形式で入力してください"
                        minRows={8}
                        value={content}
                        onChange={handleContentChange}
                    />
                    {state.errors.content && (
                        <p className="text-red-500 text-sm">{state.errors.content.join(',')}</p>) }
                </div>
               
                <div className="text-right text-sm text-gray-500 mt-1">
                    文字数: {contentLength}
                </div>
                
                <div>
                    <Button
                        type="button"
                        onClick={() => setPreview(!preview)}
                        className="mr-2"
                    >
                        {preview ? "プレビューを閉じる" : "プレビューを表示"}
                    </Button>
                    {preview && (
                        <div className="border p-4 rounded bg-gray-50 prose max-w-none">
                            <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            skipHtml={false} // HTMLスキップを無効化
                            unwrapDisallowed={true} // Markdownの改行を解釈
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            投稿する
                    </Button>
                </div>        
            </form>
        </div>
  )
}
