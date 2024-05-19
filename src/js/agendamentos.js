document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('appointmentForm');
    if (!form) {
        console.error('Formulário não encontrado!');
        return;
    }

    console.log('Formulário encontrado, adicionando evento de submit.');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Evento de submit capturado.');

        const petName = document.getElementById('petName').value.trim();
        const serviceType = document.getElementById('serviceType').value;
        const appointmentDate = document.getElementById('appointmentDate').value;
        const additionalInfo = document.getElementById('additionalInfo').value.trim();

        console.log('Dados capturados:', { petName, serviceType, appointmentDate, additionalInfo });

        if (!petName || !serviceType || !appointmentDate) {
            console.error("Preencha todos os campos obrigatórios.");
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const appointmentData = {
            petName,
            serviceType,
            appointmentDate,
            additionalInfo
        };
        try {

            localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
            console.log('Dados salvos com sucesso no localStorage.');
            alert("Agendamento salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar os dados: ", error);
            alert("Falha ao salvar o agendamento.");
        }
    });
});
