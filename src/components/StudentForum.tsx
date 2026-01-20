import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  ThumbsUp, 
  Plus, 
  Search, 
  Clock,
  Tag
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorInitial: string;
  category: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

export const StudentForum = () => {
  const { t, language, translateSubject, translateCategory } = useLanguage();

  const getInitialPosts = (): ForumPost[] => [
    {
      id: "1",
      title: language === "ar" ? "نصائح لحفظ القرآن بفعالية" : "Tips for memorizing Quran effectively",
      content: language === "ar" 
        ? "أواجه صعوبة في الحفظ. هل لديكم نصائح تعمل معكم؟ أجد صعوبة في الاحتفاظ بما تعلمته..."
        : "I've been struggling with memorization. Does anyone have tips that work for them? I find it hard to retain what I've learned...",
      author: language === "ar" ? "فاطمة يوسف" : "Fatima Yusuf",
      authorInitial: language === "ar" ? "ف" : "F",
      category: "Islamic Studies",
      timestamp: language === "ar" ? "منذ ساعتين" : "2 hours ago",
      likes: 15,
      replies: 8,
      isLiked: false,
    },
    {
      id: "2",
      title: language === "ar" ? "الرياضيات - تقنيات حل معادلات الجبر" : "Mathematics - Algebra problem solving techniques",
      content: language === "ar"
        ? "هل يمكن لأحد شرح كيفية حل المعادلات التربيعية خطوة بخطوة؟ شرح الكتاب محير."
        : "Can someone explain how to solve quadratic equations step by step? The textbook explanation is confusing.",
      author: language === "ar" ? "محمد علي" : "Muhammad Ali",
      authorInitial: language === "ar" ? "م" : "M",
      category: "Mathematics",
      timestamp: language === "ar" ? "منذ 5 ساعات" : "5 hours ago",
      likes: 12,
      replies: 6,
      isLiked: true,
    },
    {
      id: "3",
      title: language === "ar" ? "مجموعة دراسية للامتحانات القادمة" : "Study group for upcoming exams",
      content: language === "ar"
        ? "من يريد تشكيل مجموعة دراسية لامتحانات نهاية الفصل؟ يمكننا الاجتماع في المكتبة بعد الدوام."
        : "Who wants to form a study group for the end of term exams? We can meet in the library after school hours.",
      author: language === "ar" ? "أحمد إبراهيم" : "Ahmad Ibrahim",
      authorInitial: language === "ar" ? "أ" : "A",
      category: "General",
      timestamp: language === "ar" ? "منذ يوم" : "1 day ago",
      likes: 23,
      replies: 15,
      isLiked: false,
    },
    {
      id: "4",
      title: language === "ar" ? "قواعد اللغة العربية - فهم الإعراب" : "Arabic grammar - Understanding I'rab",
      content: language === "ar"
        ? "أجد قواعد اللغة العربية صعبة جداً، خاصة الإعراب. هل من موارد أو طرق دراسة موصى بها؟"
        : "I find Arabic grammar very challenging, especially I'rab (إعراب). Any recommended resources or study methods?",
      author: language === "ar" ? "عائشة بيلو" : "Aisha Bello",
      authorInitial: language === "ar" ? "ع" : "A",
      category: "Arabic",
      timestamp: language === "ar" ? "منذ يومين" : "2 days ago",
      likes: 18,
      replies: 12,
      isLiked: false,
    },
  ];

  const categories = [
    { value: "All", label: t("all") },
    { value: "General", label: t("general") },
    { value: "Mathematics", label: translateSubject("Mathematics") },
    { value: "Islamic Studies", label: translateSubject("Islamic Studies") },
    { value: "Arabic", label: translateSubject("Arabic") },
    { value: "Science", label: translateSubject("Science") },
    { value: "English", label: translateSubject("English") },
  ];

  const [posts, setPosts] = useState<ForumPost[]>(getInitialPosts());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "General" });

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error(t("please_fill_fields"));
      return;
    }

    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: language === "ar" ? "أنت" : "You",
      authorInitial: language === "ar" ? "أ" : "Y",
      category: newPost.category,
      timestamp: t("just_now"),
      likes: 0,
      replies: 0,
      isLiked: false,
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "General" });
    setNewPostOpen(false);
    toast.success(language === "ar" ? "تم إنشاء المناقشة بنجاح!" : "Post created successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("search_discussions")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t("new_topic")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t("create_discussion")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>{t("discussion_title")}</Label>
                  <Input
                    placeholder={language === "ar" ? "أدخل عنوان المناقشة" : "Enter discussion title"}
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("category")}</Label>
                  <Select
                    value={newPost.category}
                    onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter((c) => c.value !== "All").map((category) => (
                        <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("discussion_content")}</Label>
                  <Textarea
                    placeholder={language === "ar" ? "ما الذي تريد مناقشته؟" : "What would you like to discuss?"}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={5}
                  />
                </div>
                <Button onClick={handleCreatePost} className="w-full">
                  {t("create_discussion")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="border-none shadow-card">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("no_discussions")}</h3>
              <p className="text-muted-foreground">{t("be_first_discussion")}</p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="border-none shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {post.authorInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{post.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.timestamp}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {translateCategory(post.category)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post.id);
                        }}
                        className={post.isLiked ? "text-primary" : "text-muted-foreground"}
                      >
                        <ThumbsUp className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {post.replies} {t("replies")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
