import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {deletePost} from "@/lib/actions/deletePost";

type DeletePostProps = {
  postId: string;
  isOpen: boolean;
  onOpenchange:(open: boolean) => void;
}   

export default function DeletePostDialog({postId,isOpen, onOpenchange}: DeletePostProps) {


  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenchange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    記事の削除
                </AlertDialogTitle>
                <AlertDialogDescription>
                    この記事を削除してもよろしいですか？
                    <br />
                    削除した記事は復元できません。
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    キャンセル
                </AlertDialogCancel>
                <AlertDialogAction
                    className="bg-red-500 hover:bg-red-600 border-red-500" 
                    onClick={()=>deletePost(postId)}
                >
                    削除する
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
