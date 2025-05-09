// import {Box, Flex, Image, ModalCloseButton, Modal, ModalBody} from '@chakra-ui/react';
// import React, {useEffect} from 'react';
// import {IoChevronBack, IoChevronForward} from 'react-icons/io5';

// export default function ViewImage({
//   modal,
//   currentImageIndex,
//   setCurrentImageIndex,
//   photos,
//   resetCurrentImageIndex,
//   src
// }) {
//   const photoSrc = src ?? photos?.[currentImageIndex]?.photo;

//   return (
//     <div>
//       <Modal
//         mt="6vh"
//         size="full"
//         minH="679px"
//         color="#191919"
//         overflowY="auto"
//         isOpen={modal.isOpen}
//         onClose={() => {
//           modal.onClose();
//           resetCurrentImageIndex();
//         }}
//         minW={{base: '90%', md: '1190px'}}
//         bg="gray"
//         closeButtonColor={'#fff'}
//         style={{...glassmorphicBg}}
//         isCentered
//       >
//         <ModalBody h="auto">
//           <Flex height="600px" width={'100%'} justifyContent="space-between" alignItems={'center'}>
//             <div>
//               {currentImageIndex > 0 && (
//                 <button onClick={() => setCurrentImageIndex(currentImageIndex - 1)}>
//                   <IoChevronBack size={'30'} />
//                 </button>
//               )}
//             </div>
//             <Image src={photoSrc} alt="" width={'93%'} height="100%" objectFit={'contain'} />
//             <div>
//               {currentImageIndex < photos?.length - 1 && (
//                 <button onClick={() => setCurrentImageIndex(currentImageIndex + 1)}>
//                   <IoChevronForward size={'30'} />
//                 </button>
//               )}
//             </div>
//           </Flex>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// }

// const glassmorphicBg = {
//   background: 'rgba(255, 255, 255, 0.2)',
//   borderRadius: '16px',
//   boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
//   backdropFilter: 'blur(5px)',
//   border: '1px solid rgba(255, 255, 255, 0.3)',
// };
