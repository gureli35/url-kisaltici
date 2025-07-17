"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axios from "axios";
import { 
  Link2, 
  BarChart3, 
  Copy, 
  Calendar,
  MousePointer,
  Zap,
  Globe
} from "lucide-react";

type ShortenedUrl = {
  id: number;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: string;
};

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentUrls, setRecentUrls] = useState<ShortenedUrl[]>([]);
  const [allUrls, setAllUrls] = useState<ShortenedUrl[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error("Lütfen bir URL giriniz");
      return;
    }

    setIsLoading(true);
    
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/urls/shorten`;
      console.log("API URL:", apiUrl);
      console.log("Gönderilen URL:", url);
      
      const response = await axios.post(apiUrl, {
        originalUrl: url
      });
      
      console.log("API Yanıtı:", response.data);
      setShortenedUrl(response.data.shortUrl);
      setRecentUrls(prev => [response.data, ...prev].slice(0, 5));
      toast.success("URL başarıyla kısaltıldı!");
      setUrl("");
    } catch (error) {
      console.error("Detaylı Hata:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Hatası:", error.response?.data);
        console.error("Status:", error.response?.status);
        toast.error(`API Hatası: ${error.response?.data?.message || error.message}`);
      } else {
        toast.error("URL kısaltılırken bir hata oluştu");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllUrls = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/urls/all`);
      setAllUrls(response.data);
    } catch (error) {
      console.error("İstatistikler alınamadı:", error);
      toast.error("İstatistikler alınırken bir hata oluştu");
    }
  };

  const copyToClipboard = (urlToCopy: string) => {
    navigator.clipboard.writeText(urlToCopy);
    toast.success("URL panoya kopyalandı!");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Anında Kısaltma</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <span>Detaylı İstatistikler</span>
          </div>
          <div className="flex items-center gap-2">
            <MousePointer className="w-4 h-4 text-pink-600" />
            <span>Tıklanma Takibi</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="shorten" className="w-full" onValueChange={(value) => {
        if (value === "stats") {
          fetchAllUrls();
        }
      }}>
        <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
          <TabsTrigger value="shorten" className="text-lg py-3 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            <Link2 className="w-5 h-5 mr-2" />
            URL Kısalt
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-lg py-3 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
            <BarChart3 className="w-5 h-5 mr-2" />
            İstatistikler
          </TabsTrigger>
        </TabsList>
        <TabsContent value="shorten" className="space-y-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                URL Kısaltma Merkezi
              </CardTitle>
              <CardDescription className="text-lg text-slate-600 dark:text-slate-300">
                Uzun URL&apos;lerinizi anında kısaltın ve kolayca paylaşın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    type="url"
                    placeholder="https://example.com/uzun-url-adresi"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isLoading}
                    required
                    className="h-14 text-lg pl-12 pr-4 border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                  disabled={isLoading || !url}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      İşleniyor...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      URL&apos;yi Kısalt
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          {shortenedUrl && (
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-l-green-500">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  Başarılı!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="border-green-200 bg-white/50 dark:bg-slate-800/50">
                  <AlertDescription className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Kısaltılmış URL:</p>
                      <span className="font-mono font-semibold text-lg text-green-700 dark:text-green-300 break-all">
                        {shortenedUrl}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(shortenedUrl)}
                      className="flex-shrink-0 bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 border-green-300 dark:border-green-600"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Kopyala
                    </Button>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
          {recentUrls.length > 0 && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Son Kısaltılan URL&apos;ler
                </CardTitle>
                <CardDescription>
                  En son oluşturduğunuz kısa URL&apos;ler ve tıklanma sayıları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-800">
                      <TableRow>
                        <TableHead className="font-semibold">
                          <div className="flex items-center gap-2">
                            <Link2 className="w-4 h-4" />
                            Kısa URL
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold">
                          <div className="flex items-center gap-2">
                            <MousePointer className="w-4 h-4" />
                            Tıklanma
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold">İşlem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUrls.map((item) => (
                        <TableRow key={item.shortCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <TableCell className="font-medium">
                            <div className="truncate max-w-xs font-mono text-blue-600 dark:text-blue-400">
                              {item.shortUrl}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              {item.clickCount}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => copyToClipboard(item.shortUrl)}
                              className="hover:bg-blue-100 dark:hover:bg-blue-900"
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Kopyala
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="stats">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                URL İstatistikleri
              </CardTitle>
              <CardDescription className="text-lg text-slate-600 dark:text-slate-300">
                Tüm kısaltılmış URL&apos;lerin detaylı performans analizi
              </CardDescription>
            </CardHeader>
            <CardContent>
              {allUrls.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl">📈</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Henüz istatistik yok
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Henüz kısaltılmış URL bulunmuyor. İlk URL&apos;nizi kısaltarak istatistikleri görmeye başlayın!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {allUrls.length}
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">Toplam URL</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {allUrls.reduce((total, url) => total + url.clickCount, 0)}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">Toplam Tıklanma</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                        {Math.round(allUrls.reduce((total, url) => total + url.clickCount, 0) / allUrls.length) || 0}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">Ortalama Tıklanma</div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-slate-50 dark:bg-slate-800">
                        <TableRow>
                          <TableHead className="font-semibold">🌐 Orijinal URL</TableHead>
                          <TableHead className="font-semibold">🔗 Kısa URL</TableHead>
                          <TableHead className="font-semibold">👆 Tıklanma</TableHead>
                          <TableHead className="font-semibold">📅 Oluşturulma</TableHead>
                          <TableHead className="font-semibold">⚡ İşlem</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allUrls.map((item) => (
                          <TableRow key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <TableCell>
                              <div className="truncate max-w-xs text-slate-700 dark:text-slate-300" title={item.originalUrl}>
                                {item.originalUrl}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="truncate max-w-xs font-mono text-blue-600 dark:text-blue-400">
                                {item.shortUrl}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-300">
                                {item.clickCount}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(item.shortUrl)}
                                className="hover:bg-blue-100 dark:hover:bg-blue-900"
                              >
                                📋 Kopyala
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}