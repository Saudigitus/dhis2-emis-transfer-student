interface ImportContentProps {
    setOpen: (value: boolean) => void
}

interface ApproveTranferProps {
    setOpen: (value: boolean) => void
    handleCloseApproval: () => void  
}

interface RequestTranferProps {
    setOpen: (value: boolean) => void
}


interface ModalProps {
    open: boolean
    title: string
    children: React.ReactNode
    setOpen: (value: boolean) => void
  }
  

export type { ImportContentProps, ApproveTranferProps, RequestTranferProps, ModalProps }