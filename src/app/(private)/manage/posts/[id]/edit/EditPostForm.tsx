'use client'
import React, { useState, useActionState,useEffect } from "react";
import {updatePost} from "@/lib/actions/updatePost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// propsで受け取る 型指定
type EditPostFormProps = {
  post: {
    id: string; 
    title: string; 
    content: string; 
    topImage?: string | null ; 
    published: boolean
  }
};

export default function EditPostForm({post}: EditPostFormProps) {

    const [content, setContent] = useState(post.content) // 記事の文章
    const [contentLength, setContentLength] = useState(0) // 文字数
    const [preview, setPreview] = useState(false) // プレビュー

    // タイトル、表示非表示、画像のプレビューもuseStateで変更できるように
    const [title, setTitle] = useState(post.title);
    const [published, setPublished] = useState(post.published);
    const [imagePreview, setImagePreview] = useState(post.topImage);


    const [state, formAction] = useActionState(updatePost, {
        success: false, errors: {}
        });
    
    const handleContentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setContentLength(e.target.value.length);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // プレビュー用URL生成 ブラウザのメモリに保存される
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl);
    }}
    
    // プレビューURLはブラウザのメモリに保存される
    // コンポーネントが破棄されるかimagePreview変更時に プレビューURLを解放
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview !== post.topImage) {
                URL.revokeObjectURL(imagePreview); // プレビューurlはブラウザのメモリに保存される
            }
        };
    }, [imagePreview, post.topImage]);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-10">
                新規記事投稿(Markdown対応)
            </h1>
            <form action={formAction} className="space-y-4">
                <div>
                    <Label htmlFor="title">タイトル</Label>
                    <input 
                      className="ml-2 border w-full" 
                      type="text" id="title" 
                      name="title" 
                      placeholder="タイトルを入力してください"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      />
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
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <Image
                                src={imagePreview}
                                alt={post.title}
                                width={0}
                                height={0}
                                sizes="200px"
                                className="w-[200px]"
                                priority
                            />
                        </div>
                    )}
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

                    <RadioGroup 
                        value={published.toString()} 
                        name="published" 
                        onValueChange={(value) => setPublished(value === 'true')}
                    >
                        <div className="mt-2 flex items-center space-x-2">
                            <RadioGroupItem value="true" id="published-one" />
                            <Label htmlFor="published-one">表示</Label>
                        </div>
                        <div className="mb-2 flex items-center space-x-2">
                            <RadioGroupItem value="false" id="published-two" />
                            <Label htmlFor="published-two">非表示</Label>
                        </div>
                    </RadioGroup>

                    <Button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            更新する
                    </Button>
                </div>        
            <input type="hidden" name="postId" value={post.id} />
            <input type="hidden" name="oldImageUrl" value={post.topImage || ''} />
            </form>
        </div>
  )
}
