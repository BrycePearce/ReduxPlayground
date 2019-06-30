using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// A hub is a class that serves as a high-level pipeline that handles client-server communication.
namespace SignalRChat.Hubs
{
    public class ChatHub : Hub // The Hub class manages connections, groups, and messaging
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message); // send the message
        }
    }
}
