import CloseBtn from '@/assets/svgs/close-modal-btn.svg'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'

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
    <Dialog open={open}>
      <VisuallyHidden>
        <DialogTitle></DialogTitle>
      </VisuallyHidden>
      <DialogContent showCloseButton={false} className={className}>
        {children}
        <Image
          src={CloseBtn}
          alt="Next.js logo"
          width={35}
          height={20}
          onClick={() => onChangeOpen && onChangeOpen(false)}
          className="absolute -right-4 -top-4"
        />
      </DialogContent>
    </Dialog>
  )
}
