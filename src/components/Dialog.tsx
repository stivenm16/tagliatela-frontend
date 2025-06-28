import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface DialogProps {
  open?: boolean
  children?: React.ReactNode
  onChangeOpen?: (open: boolean) => void
  className?: string
}

export const CardDialog = ({
  open,
  onChangeOpen,
  children,
  className,
}: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onChangeOpen}>
      <VisuallyHidden>
        <DialogTitle></DialogTitle>
      </VisuallyHidden>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  )
}
