export const truncate = {
     display: '-webkit-box',
     WebkitLineClamp: 3,
     WebkitBoxOrient: 'vertical',
     overflow: 'hidden',
     textOverflow: 'ellipsis',
     maxHeight: '4.5em',
     lineHeight: '1.5em',
};

export const borderBottom = {
     color: 'primary.main',
     borderBottom: '2px solid',
     borderColor: 'primary.main',
     borderRadius: 0,
}

export const overlay = {
     position: 'absolute',
     inset: 0,
     width: '100%',
     height: '100%',
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
     color: 'white',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     fontWeight: 'bold',
     zIndex: 1,
}