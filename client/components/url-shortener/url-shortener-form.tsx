"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import copy from "copy-to-clipboard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// URL şeması
const urlSchema = z.object({
  originalUrl: z.string().url("Geçerli bir URL giriniz").refine(
    (url) => url.startsWith("http://") || url.startsWith("https://"),
    { message: "URL 'http://' veya 'https://' ile başlamalıdır" }
  ),
});

// Kısaltılmış URL tipi
export type ShortenedUrl = {
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: string;
};

export function UrlShortenerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrl | null>(null);
  const [recentUrls, setRecentUrls] = useState<ShortenedUrl[]>([]);

  // Form tanımlaması
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  // Form gönderme işlemi
  const onSubmit = async (values: z.infer<typeof urlSchema>) => {
    try {
      setIsLoading(true);
      
      // API'ye istek gönder
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/urls/shorten`, 
        { originalUrl: values.originalUrl }
      );
      
      const newUrl = response.data;
      setShortenedUrl(newUrl);
      
      // Son eklenen URL'leri güncelle
      setRecentUrls(prev => [newUrl, ...prev].slice(0, 5));
      
      // Formu sıfırla
      form.reset();
      
      toast.success("URL başarıyla kısaltıldı!");
    } catch (error) {
      console.error("URL kısaltma hatası:", error);
      let errorMessage = "URL kısaltılırken bir hata oluştu";
      
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.error || errorMessage;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // URL'yi panoya kopyala
  const copyToClipboard = (url: string) => {
    copy(url);
    toast.success("URL panoya kopyalandı!");
  };

  return (
    <div className="space-y-8 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>URL Kısaltıcı</CardTitle>
          <CardDescription>
            Uzun URL&apos;lerinizi kısaltın ve daha kolay paylaşın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="originalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/uzun-url-adresi" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "İşleniyor..." : "URL'yi Kısalt"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {shortenedUrl && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Kısaltılmış URL</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription className="flex items-center justify-between">
                <span className="font-medium truncate">{shortenedUrl.shortUrl}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(shortenedUrl.shortUrl)}
                >
                  Kopyala
                </Button>
              </AlertDescription>
            </Alert>
            <p className="mt-2 text-xs text-muted-foreground">
              Orijinal URL: <span className="truncate">{shortenedUrl.originalUrl}</span>
            </p>
          </CardContent>
        </Card>
      )}

      {recentUrls.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Son Kısaltılan URL&apos;ler</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kısa URL</TableHead>
                  <TableHead className="hidden md:table-cell">Tıklanma</TableHead>
                  <TableHead>İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUrls.map((url) => (
                  <TableRow key={url.shortCode}>
                    <TableCell className="font-medium truncate">
                      {url.shortUrl}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{url.clickCount}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(url.shortUrl)}
                      >
                        Kopyala
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
