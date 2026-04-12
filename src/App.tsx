import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, MapPin, Download, ExternalLink, Briefcase, GraduationCap, Code, User, Heart, Award, Send, CheckCircle2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const FetchedImage = ({ src, alt, className, onError }: { src: string, alt: string, className?: string, onError?: React.ReactEventHandler<HTMLImageElement> }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    let objectUrl: string;
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        if (isMounted) {
          objectUrl = URL.createObjectURL(blob);
          setImgSrc(objectUrl);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        if (isMounted) {
          setImgSrc(src); // Fallback to original src
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  if (!imgSrc) return <div className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 ${className}`} />;

  return <img src={imgSrc} alt={alt} className={className} onError={onError} />;
};

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-4 sm:p-8 md:p-12 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar */}
        <motion.div 
          className="lg:col-span-4 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-lg bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm sticky top-8">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="w-32 h-32 border-4 border-white dark:border-zinc-800 shadow-xl">
                  <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Amanda&backgroundColor=f1f5f9" alt="Amanda" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
              </motion.div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">賴以婕 Amanda</h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">工業設計師 / 包裝工程師</p>
                <p className="text-sm text-zinc-400 flex items-center justify-center gap-1 pt-2">
                  <MapPin className="w-4 h-4" /> 台灣, 台中
                </p>
              </div>

              <div className="flex gap-3 w-full justify-center">
                <a 
                  href="mailto:amanda840604@gmail.com"
                  className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors")}
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a 
                  href="https://line.me/ti/p/fk-CFFKYiU" 
                  target="_blank" 
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors")}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992z"/>
                  </svg>
                </a>
              </div>

              <Separator className="w-full" />

              <div className="w-full space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 dark:text-zinc-400">目前狀態</span>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100">開放機會中</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 dark:text-zinc-400">工作經驗</span>
                  <span className="font-medium">6+ 年</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 dark:text-zinc-400">聯絡電話</span>
                  <span className="font-medium">0918-190-990</span>
                </div>
              </div>

              <Button className="w-full rounded-full shadow-md hover:shadow-lg transition-all" size="lg">
                <Download className="w-4 h-4 mr-2" /> 下載履歷 PDF
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="lg:col-span-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Tabs defaultValue="about" className="w-full">
            <ScrollArea className="w-full whitespace-nowrap rounded-2xl">
              <TabsList className="w-full justify-start mb-8 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-1 rounded-2xl shadow-sm">
                <TabsTrigger value="about" className="rounded-xl data-[state=active]:shadow-sm"><User className="w-4 h-4 mr-2 hidden sm:block" /> 關於我</TabsTrigger>
                <TabsTrigger value="experience" className="rounded-xl data-[state=active]:shadow-sm"><Briefcase className="w-4 h-4 mr-2 hidden sm:block" /> 經歷</TabsTrigger>
                <TabsTrigger value="skills" className="rounded-xl data-[state=active]:shadow-sm"><Code className="w-4 h-4 mr-2 hidden sm:block" /> 專長與技能</TabsTrigger>
                <TabsTrigger value="projects" className="rounded-xl data-[state=active]:shadow-sm"><Award className="w-4 h-4 mr-2 hidden sm:block" /> 專案成就</TabsTrigger>
                <TabsTrigger value="interests" className="rounded-xl data-[state=active]:shadow-sm"><Heart className="w-4 h-4 mr-2 hidden sm:block" /> 興趣</TabsTrigger>
              </TabsList>
            </ScrollArea>

            {/* About Section */}
            <TabsContent value="about" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <User className="w-6 h-6 text-zinc-400" /> 關於我
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mt-0">設計背景 X 設計流程開發經驗</h3>
                    <p>
                      畢業於台灣科技大學工業設計系，擁有 6 年產品與包裝設計實務經驗，熟悉從外觀設計、結構開發到量產製程的完整開發流程。
                      擅長品牌前期市場調研與定位分析，能根據產品需求進行 2D／3D 設計規劃，執行草模驗證、建模與工程圖繪製，並具備『依照預算與成本條件調整設計策略的靈活應變能力』。
                    </p>
                    
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">包裝設計專業深化</h3>
                    <p>
                      曾任職於美律實業股份有限公司，負責 TWS 耳機、電競耳機、Soundbar 等國際品牌電子產品的包裝設計與開發，持續強化『環保包裝結構設計、跨部門專案執行能力及開發實務經驗』。
                    </p>
                    <p>
                      現任職於久鼎金屬實業股份有限公司，專注於自行車關鍵零件（如車把手、座管、立管）之包裝結構革新。致力於開發「全紙質緩衝結構」與「減塑方案」，協助產業落實低碳永續目標。
                    </p>

                    <Separator className="my-6" />

                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">設計理念</h3>
                    <ul className="list-none pl-0 space-y-4">
                      <li className="flex gap-3">
                        <span className="text-emerald-500 font-bold">1.</span>
                        <div>
                          <strong>設計應兼具感性與理性：</strong>設計不僅是創造視覺與情感價值，更必須考量製程可行性、技術限制、成本控制與品質穩定性。
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-emerald-500 font-bold">2.</span>
                        <div>
                          <strong>設計須服務於產品與使用者體驗：</strong>我重視產品本質，關注設計如何實際提升使用者的便利性與品牌價值，讓設計發揮功能性與影響力。
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-emerald-500 font-bold">3.</span>
                        <div>
                          <strong>重視跨部門合作與溝通效率：</strong>良好的設計來自良好的協作，我樂於與不同角色協同合作，透過積極溝通整合各方需求與資源。
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-emerald-500 font-bold">4.</span>
                        <div>
                          <strong>持續保持熱情與學習動能：</strong>對我而言，設計不只是工作，更是一種持續探索的過程。我始終懷抱熱情與好奇心，樂於在團隊中貢獻專業，也期待在未來的職位中持續成長，與夥伴一同創造實質價值，攜手向前。
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-zinc-400" /> 學歷
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
                      <div className="absolute w-3 h-3 bg-zinc-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-zinc-950" />
                      <h3 className="text-lg font-bold">國立臺灣科技大學</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 font-medium">工業設計系 學士</p>
                    </div>
                    <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
                      <div className="absolute w-3 h-3 bg-zinc-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-zinc-950" />
                      <h3 className="text-lg font-bold">國立台中高工</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 font-medium">圖文傳播科</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Mail className="w-6 h-6 text-zinc-400" /> 聯絡我
                    </CardTitle>
                    <CardDescription>
                      有任何合作機會或問題，歡迎直接透過表單與我聯繫！
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-8 text-emerald-600 dark:text-emerald-400 space-y-4"
                      >
                        <CheckCircle2 className="w-16 h-16" />
                        <p className="text-lg font-medium">訊息已成功送出！我會盡快回覆您。</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">姓名</Label>
                            <Input id="name" required placeholder="您的姓名" className="bg-white/50 dark:bg-zinc-950/50" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">電子郵件</Label>
                            <Input id="email" type="email" required placeholder="your@email.com" className="bg-white/50 dark:bg-zinc-950/50" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">訊息內容</Label>
                          <Textarea id="message" required placeholder="請輸入您的訊息..." className="min-h-[120px] bg-white/50 dark:bg-zinc-950/50" />
                        </div>
                        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                <Code className="w-4 h-4" />
                              </motion.div>
                              傳送中...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="w-4 h-4" /> 送出訊息
                            </span>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Experience Section */}
            <TabsContent value="experience" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-zinc-400" /> 工作經歷
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Experience 1 */}
                    <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
                      <div className="absolute w-3 h-3 bg-zinc-900 dark:bg-zinc-100 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-zinc-950" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">包裝工程師</h3>
                          <p className="text-zinc-600 dark:text-zinc-400 font-medium">美律實業股份有限公司 (精密儀器相關製造業 500人以上)</p>
                          <p className="text-sm text-zinc-500">台中市南屯區</p>
                        </div>
                        <Badge variant="outline" className="w-fit">2022/7 - 2025/5 (2年11個月)</Badge>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">主要職責：</h4>
                          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300 space-y-1 ml-2 text-sm">
                            <li>消費性電子產品包裝開發工作、包裝相關提案與結構設計</li>
                            <li>新機型產品包材圖面繪製、包裝作業流程製作</li>
                            <li>包裝廠商樣品追蹤、品質問題改善確認</li>
                            <li>包裝BOM建立維護並追蹤廠商承認書</li>
                            <li>配合工廠試產階段需求，包材組裝生產問題協調解決</li>
                            <li>配合中國工廠試產進度，出差至現場協助問題排除與製程優化</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">專案成果：</h4>
                          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300 space-y-1 ml-2 text-sm">
                            <li><strong>國際品牌 TWS／HDT／Soundbar 包裝設計提案 (共25件)：</strong>依產品定位提出多元價位包裝設計方案，接案達成率達40%。於RFQ階段設計消費性電子產品包裝，達成研發成本節省約10%。</li>
                            <li><strong>建立包裝設計資料庫以及市調資料表 (共6件)：</strong>彙整紙卡內襯結構規格，形成模組化資料庫，加速專案提案效率。</li>
                            <li><strong>參與 HDT 電競耳機開發專案 (共2件)：</strong>參與產品開發流程，累積品牌級耳機產品的包裝結構設計與量產導入經驗。</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">Creo</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">產品開發</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">包裝設計</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Experience 2 */}
                    <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
                      <div className="absolute w-3 h-3 bg-zinc-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-zinc-950" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">工業設計師</h3>
                          <p className="text-zinc-600 dark:text-zinc-400 font-medium">台灣櫻花股份有限公司 (非金屬家具及裝設品製造業 500人以上)</p>
                          <p className="text-sm text-zinc-500">台中市大雅區</p>
                        </div>
                        <Badge variant="outline" className="w-fit">2020/3 - 2022/7 (2年5個月)</Badge>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">主要職責：</h4>
                          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300 space-y-1 ml-2 text-sm">
                            <li>針對 PM 市場規劃結合消費者調查結果擬定設計方向</li>
                            <li>國內外廚電市場與造型趨勢調研</li>
                            <li>當年度新品設計提案與簡報製作</li>
                            <li>SAKURA、TOPAX、SVAGO品牌產品造型設計</li>
                            <li>樣品發包與結構驗證追蹤、試產問題處理與製程協調</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">專案成果：</h4>
                          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300 space-y-1 ml-2 text-sm">
                            <li><strong>2021 年度績優員工</strong></li>
                            <li><strong>產品開發與上市經驗：</strong>主導易清檯面爐 G2522AG、G2623AG 上市。提出「機能造型」設計主張。規劃雙品牌近吸式油煙機共 5 款新品設計。</li>
                            <li><strong>設計專利成果 (共5件)：</strong>包含易清檯面爐、塑膠把手烘碗機、無掀蓋與掀蓋式油煙機等機型。</li>
                            <li><strong>年度目標達成率 125%：</strong>儲備移轉率達 75%，超越原訂 60% 目標。</li>
                            <li><strong>設計競賽獲獎經歷：</strong>承辦金點設計競賽，獲獎作品：R3750B、P0233／235。</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">Creo</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">Photoshop</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">Illustrator</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">Key Shot</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Experience 3 */}
                    <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
                      <div className="absolute w-3 h-3 bg-zinc-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-zinc-950" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">產品設計工程師</h3>
                          <p className="text-zinc-600 dark:text-zinc-400 font-medium">上岳科技股份有限公司 (醫療器材製造業 30~100人)</p>
                          <p className="text-sm text-zinc-500">台中市南屯區</p>
                        </div>
                        <Badge variant="outline" className="w-fit">2018/11 - 2019/12 (1年2個月)</Badge>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">主要職責：</h4>
                          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300 space-y-1 ml-2 text-sm">
                            <li>新品提案與簡報製作：依據RD提供模組進行產品設計提案，含視覺、材質規劃與造型風格定調</li>
                            <li>產品造型設計：主導醫療器材造型開發</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">專案成果：</h4>
                          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300 space-y-1 ml-2 text-sm">
                            <li>低周波治療器2款外觀提案</li>
                            <li>兒童用霧化器外觀提案</li>
                            <li>SPO2手環5款外觀提案</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">SolidWorks</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">產品機構設計</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">外型設計</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Experience 4 */}
                    <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800">
                      <div className="absolute w-3 h-3 bg-zinc-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-zinc-950" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-md bg-white border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                            {/* 使用 fetch + URL.createObjectURL() 動態載入圖片 */}
                            <FetchedImage src="/cic-logo.png" alt="研成股份有限公司 Logo" className="w-full h-full object-contain p-1" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.classList.add('bg-zinc-100', 'dark:bg-zinc-800'); }} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">工業設計師</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 font-medium">研成股份有限公司 (專門設計相關業 30~100人)</p>
                            <p className="text-sm text-zinc-500">新北市新店區</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="w-fit mt-1 sm:mt-0">2017/8 - 2018/8 (1年1個月)</Badge>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">主要職責：</h4>
                          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300 space-y-1 ml-2 text-sm">
                            <li>新品提案與簡報製作：依據RD提供模組進行產品設計提案</li>
                            <li>產品造型設計</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">專案成果：</h4>
                          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300 space-y-1 ml-2 text-sm">
                            <li>獨立負責日本學研GAKKEN委託之鋁製品設計案</li>
                            <li>研發多合一solar新產品&彩盒設計規劃</li>
                            <li>協助2018年度12in1 solar產品色彩配置</li>
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">產品設計</Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">產品包裝設計</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Skills Section */}
            <TabsContent value="skills" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Code className="w-6 h-6 text-zinc-400" /> 專長與技能
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">1. 市場調研與定位分析</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">擅長設計前期的競品蒐集並針對該品牌定位分析，總結設計規畫方向。</p>
                      <div className="flex flex-wrap gap-2">
                        {['競品分析', '產品策略', '產品定位', '市場調查資料分析與報告撰寫'].map((skill) => (
                          <Badge key={skill} className="px-3 py-1 text-sm bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 border-none">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">2. 2D 品牌視覺整合與簡報提案</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">擅長整合包裝結構與品牌識別，製作具專業感與說服力的提案簡報，提升客戶接受度。精通 Adobe InDesign、Illustrator、Photoshop。</p>
                      <div className="flex flex-wrap gap-2">
                        {['Adobe InDesign', 'Illustrator', 'Photoshop', '電腦排版設計', '設計印刷基本認知', '設計表現能力', '電腦印前設計'].map((skill) => (
                          <Badge key={skill} className="px-3 py-1 text-sm bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 border-none">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">3. 3D 建模與結構模擬</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">能快速建構產品結構模型並進行裝配模擬，支援從設計構想至工程實務的溝通橋梁。</p>
                      <div className="flex flex-wrap gap-2">
                        {['PTC Creo', 'SolidWorks', 'Rhino', 'Keyshot', '產品結構評估'].map((skill) => (
                          <Badge key={skill} className="px-3 py-1 text-sm bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 border-none">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">4. 包裝材料選用與BOM建立</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">熟悉泡殼、瓦楞紙卡、紙托等常用包材的特性，依需求提出保護性與成本效益的優化方案。熟練繪製工程圖並建立 BOM 表。</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">5. 打樣實作與設計驗證能力</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">善用割樣機進行結構模擬與快速打樣，快速驗證設計可行性，減少與供應商溝通與試誤成本。</p>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-zinc-400" /> 進修課程
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">ChatGPT LV.1 AI對話機器人開發</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">2025.4.12</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">學習建立具備不同屬性與對話邏輯的 AI 機器人，強化個人於多元應用場景中導入 AI 工具的能力。</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">MAKE LV.1 LINE官方帳號 AI整合應用</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">2025.03.26</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">學習將 AI 技術應用於 LINE 平台，實作串聯官方帳號與自建 AI 機器人，自動回應用戶訊息。</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">在職菁英AI人才培育課程</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">2025.12.09-2025.12.17 (30小時)</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">學習AI基礎概論與架構、機器學習技術理論與案例、生成式AI的原理與應用。</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">包裝結構設計、運輸驗證與成本優化實務課程</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">2026.03.26 (48小時) - 財團法人塑膠工業技術發展中心</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">iPAS AI應用規劃師初級證照班課程</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">2026.04.26 (48小時) - 中國生產力中心</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Projects Section */}
            <TabsContent value="projects" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Award className="w-6 h-6 text-zinc-400" /> 包裝設計專案成就
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'HDT 紙卡內襯設計', 'Soundbar 紙卡內襯設計', 'Soundbar 設計', 
                        '視訊鏡頭包裝設計', 'Carrycase 包袋設計', 'TWS 包裝設計', 
                        'TWS 紙卡內襯設計', 'MTB Handle Bar 包裝設計', 'TR Handle Bar 包裝設計',
                        'RA Handle Bar 包裝設計', '座管 包裝設計', '快拆束仔 包裝設計', '立管 包裝設計'
                      ].map((project, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                          <div className="w-8 h-8 rounded bg-white dark:bg-zinc-700 flex items-center justify-center shadow-sm">
                            <Briefcase className="w-4 h-4 text-zinc-500" />
                          </div>
                          <span className="font-medium text-sm">{project}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Code className="w-6 h-6 text-zinc-400" /> 產品/平面設計專案成就
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        '油煙機設計', '瓦斯爐設計', '穿戴式裝置設計', 
                        '醫療器材設計', '玩具設計', '平面設計', '手繪作品'
                      ].map((project, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                          <div className="w-8 h-8 rounded bg-white dark:bg-zinc-700 flex items-center justify-center shadow-sm">
                            <Code className="w-4 h-4 text-zinc-500" />
                          </div>
                          <span className="font-medium text-sm">{project}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Interests Section */}
            <TabsContent value="interests" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm overflow-hidden">
                    <div className="h-40 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 mix-blend-overlay" />
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                        <Heart className="w-12 h-12 opacity-20" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">重量訓練</CardTitle>
                      <CardDescription className="font-medium text-emerald-600 dark:text-emerald-400">
                        目前每週2練，目標提升至每週4練!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        訓練耐力與自律，堅持每一步小進步，挑戰更強的自己。
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm overflow-hidden">
                    <div className="h-40 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mix-blend-overlay" />
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                        <Heart className="w-12 h-12 opacity-20" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">馬拉松</CardTitle>
                      <CardDescription className="font-medium text-emerald-600 dark:text-emerald-400">
                        5次半馬，目標完成人生第一場全馬！
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        目前有5次半馬的經驗，目標挑戰人生第一場全馬拉松，不只是體能，更是堅持信念的挑戰！
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                  <Card className="h-full border-none shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm overflow-hidden">
                    <div className="h-40 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 mix-blend-overlay" />
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                        <Heart className="w-12 h-12 opacity-20" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">登山</CardTitle>
                      <CardDescription className="font-medium text-emerald-600 dark:text-emerald-400">
                        登頂2座百岳，目標持續挑戰台灣百岳全集!
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        除了健身與長跑，我也熱愛登山挑戰，目前已成功攀登兩座台灣百岳。
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

              </motion.div>
            </TabsContent>

          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

