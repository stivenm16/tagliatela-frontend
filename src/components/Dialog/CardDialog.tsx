import { Dialog, DialogClose, DialogContent } from './Dialog'

interface DialogProps {
  open?: boolean
  contentModal?: React.ReactNode
  children?: React.ReactNode
  onChangeOpen?: (open: boolean) => void
  className?: string
}

export const CardDialog = ({
  children,
  contentModal,
  className,
}: DialogProps) => {
  return (
    <Dialog>
      {children}
      <DialogContent className={className}>
        <div className="absolute -top-2 -right-4">
          <DialogClose />
        </div>
        {contentModal}
      </DialogContent>
    </Dialog>
  )
}
