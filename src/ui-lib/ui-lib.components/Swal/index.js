import React, {useEffect} from 'react';
import Swal from 'sweetalert2';

export const SwalError = ({ errMsgTitle, errMsgDesc }) => {
	const title = `${errMsgTitle}`
	const text = `${errMsgDesc}`
	useEffect(() => {
		Swal.fire({
			icon      : 'error',
			text      : text,
			showClass : {
				popup : 'animate__animated animate__fadeInDown'
			},
			hideClass : {
				popup : 'animate__animated animate__fadeOutUp'
			},
			title     : title
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
export const SwalSuccess = ({ successMsgTitle, successMsgDesc }) => {
	const title = `${successMsgTitle}`
	const text = `${successMsgDesc}`
	useEffect(() => {
		Swal.fire({
			icon      : 'success',
			text      : text,
			showClass : {
				popup : 'animate__animated animate__fadeInDown'
			},
			hideClass : {
				popup : 'animate__animated animate__fadeOutUp'
			},
			title     : title
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
