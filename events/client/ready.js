const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`✅ Prêt ! Connecté en tant que ${client.user.tag}`);

        // Enregistrement des commandes Slash globalement (peut prendre jusqu'à 1h pour se propager, instantané sur les guildes de dev)
        // Pour un développement rapide, on peut spécifier un guildId, mais ici on reste générique.
        const commands = client.commands.map(cmd => cmd.data.toJSON());
        
        try {
            console.log(`🔄 Rafraîchissement de ${commands.length} commandes d'application (/) ...`);
            
            // "set" écrase toutes les commandes existantes par les nouvelles
            await client.application.commands.set(commands);
            
            console.log('✅ Commandes enregistrées avec succès.');
        } catch (error) {
            console.error('❌ Erreur lors de l\'enregistrement des commandes :', error);
        }
    },
};
