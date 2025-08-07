import { Dialog, Avatar, CardHeader, IconButton, Tooltip, DialogContent } from '@mui/material'
import Carousel from '../../components/Carousel'

export default function GalleryCarouselDialog({ open, onClose, gallery }) {
  return (
    <Dialog open={open} onClose={onClose} slotProps={{
      card:{}
    }}>
      <DialogContent sx={{
        minWidth: 600,
        minHeight: 400,
        pt: 0
      }}>
        <CardHeader
        sx={{
          px: 0
        }}
          avatar={
            <Tooltip title={gallery?.createdBy?.employee?.fullName || gallery?.createdBy?.email}>
              <Avatar>
                {
                  gallery?.createdBy?.employee?.fullName.charAt(0).toUpperCase() ||
                  gallery?.createdBy?.email.charAt(0).toUpperCase()
                }
              </Avatar>
            </Tooltip>
          }
          action={
            <IconButton aria-label="settings">
            </IconButton>
          }
          title={gallery?.title}
          subheader={gallery?.createdAt}
        />
        <Carousel items={gallery?.attachmentList} url="fullPath" label="storedName" />
      </DialogContent>
    </Dialog>
  )
}
