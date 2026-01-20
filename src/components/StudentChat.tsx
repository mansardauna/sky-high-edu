import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Users, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  sender: string;
  senderInitial: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatRoom {
  id: string;
  nameKey: string;
  name: string;
  type: "class" | "subject" | "general";
  unread: number;
  lastMessage: string;
}

export const StudentChat = () => {
  const { t, language, translateSubject } = useLanguage();

  const getRooms = (): ChatRoom[] => [
    { 
      id: "1", 
      nameKey: "class_chat",
      name: language === "ar" ? "محادثة فصل الأول الإعدادي أ" : "JSS 1A Class Chat", 
      type: "class", 
      unread: 3, 
      lastMessage: language === "ar" ? "متى موعد تسليم الواجب؟" : "When is the assignment due?" 
    },
    { 
      id: "2", 
      nameKey: "study_group",
      name: language === "ar" ? "مجموعة دراسة الرياضيات" : "Mathematics Study Group", 
      type: "subject", 
      unread: 0, 
      lastMessage: language === "ar" ? "فهمت المفهوم الآن" : "I understood the concept now" 
    },
    { 
      id: "3", 
      nameKey: "general_chat",
      name: language === "ar" ? "الإعلانات العامة" : "General Announcements", 
      type: "general", 
      unread: 1, 
      lastMessage: language === "ar" ? "يوم الرياضة قادم!" : "Sports day is coming up!" 
    },
    { 
      id: "4", 
      nameKey: "study_group",
      name: language === "ar" ? "مجموعة الدراسات الإسلامية" : "Islamic Studies Group", 
      type: "subject", 
      unread: 5, 
      lastMessage: language === "ar" ? "هل لديكم نصائح للحفظ؟" : "Memorization tips anyone?" 
    },
  ];

  const getMessages = (): Message[] => [
    { 
      id: "1", 
      sender: language === "ar" ? "فاطمة يوسف" : "Fatima Yusuf", 
      senderInitial: language === "ar" ? "ف" : "F", 
      content: language === "ar" ? "السلام عليكم جميعاً!" : "Assalamu Alaikum everyone!", 
      timestamp: language === "ar" ? "١٠:٣٠ ص" : "10:30 AM", 
      isOwn: false 
    },
    { 
      id: "2", 
      sender: language === "ar" ? "أنت" : "You", 
      senderInitial: language === "ar" ? "أ" : "A", 
      content: language === "ar" ? "وعليكم السلام! كيف استعدادكم للامتحانات؟" : "Wa Alaikum Assalam! How is everyone preparing for exams?", 
      timestamp: language === "ar" ? "١٠:٣٢ ص" : "10:32 AM", 
      isOwn: true 
    },
    { 
      id: "3", 
      sender: language === "ar" ? "محمد علي" : "Muhammad Ali", 
      senderInitial: language === "ar" ? "م" : "M", 
      content: language === "ar" ? "ما زلت أعمل على مراجعة الرياضيات" : "Still working on the Mathematics revision", 
      timestamp: language === "ar" ? "١٠:٣٥ ص" : "10:35 AM", 
      isOwn: false 
    },
    { 
      id: "4", 
      sender: language === "ar" ? "عائشة بيلو" : "Aisha Bello", 
      senderInitial: language === "ar" ? "ع" : "A", 
      content: language === "ar" ? "هل أكمل أحد واجب العلوم؟" : "Has anyone finished the Science assignment?", 
      timestamp: language === "ar" ? "١٠:٤٠ ص" : "10:40 AM", 
      isOwn: false 
    },
    { 
      id: "5", 
      sender: language === "ar" ? "فاطمة يوسف" : "Fatima Yusuf", 
      senderInitial: language === "ar" ? "ف" : "F", 
      content: language === "ar" ? "نعم! يمكنني المساعدة إن احتجتِ" : "Yes! I can help if you need", 
      timestamp: language === "ar" ? "١٠:٤٢ ص" : "10:42 AM", 
      isOwn: false 
    },
  ];

  const [rooms] = useState<ChatRoom[]>(getRooms());
  const [messages, setMessages] = useState<Message[]>(getMessages());
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom>(rooms[0]);
  const [newMessage, setNewMessage] = useState("");

  const typeLabels: Record<string, string> = {
    class: language === "ar" ? "فصل" : "class",
    subject: language === "ar" ? "مادة" : "subject",
    general: language === "ar" ? "عام" : "general",
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: language === "ar" ? "أنت" : "You",
      senderInitial: language === "ar" ? "أ" : "Y",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(language === "ar" ? "ar-SA" : "en-US", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat Rooms List */}
      <Card className="border-none shadow-card lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5 text-primary" />
            {t("chat_rooms")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`w-full p-4 text-left border-b border-border/50 hover:bg-muted/50 transition-colors ${
                  selectedRoom.id === room.id ? "bg-primary/10" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium text-foreground text-sm">{room.name}</h4>
                  {room.unread > 0 && (
                    <Badge variant="destructive" className="text-xs h-5 min-w-5 flex items-center justify-center">
                      {room.unread}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{room.lastMessage}</p>
                <Badge variant="outline" className="mt-2 text-xs capitalize">
                  {typeLabels[room.type]}
                </Badge>
              </button>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="border-none shadow-card lg:col-span-2 flex flex-col">
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="w-5 h-5 text-primary" />
            {selectedRoom.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"}>
                      {message.senderInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[70%] ${message.isOwn ? "text-right" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {!message.isOwn && (
                        <span className="text-xs font-medium text-foreground">{message.sender}</span>
                      )}
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder={t("type_message")}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
