import Swal from "sweetalert2";

export function redirectAlert(title, message, url, icon) {
    let timerInterval;
    Swal.fire({
        title,
        html: message + "<b></b>",
        timer: 2000,
        timerProgressBar: true,
        icon,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
            window.location.href = url
        }
    })
}
export function generalAlert(title, message, icon) {
    return Swal.fire({
        title,
        text: message,
        icon,
        timer: 1500,
        showConfirmButton: false,
    });
}

export function confirmAlert(title, message, icon, confirmCallback) {
    Swal.fire({
        title,
        text: message,
        icon,
        showCancelButton: true,
        confirmButtonColor: "#1d4ed8",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            confirmCallback();
        }
    });
}