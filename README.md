# Proj_MicroServi-os

Separar por pastas para ver ter um dockerfile em cada pasta para meter cada um num microsserviço diferente

Usar isto para comunicar do auth-service até ao user-service:
- const res = await fetch('http://user-service:3000/api/users');
