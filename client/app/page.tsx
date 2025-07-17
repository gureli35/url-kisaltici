import { UrlShortener } from "@/components/url-shortener";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              URL Kısaltıcı
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Uzun URL&apos;lerinizi kısaltın, paylaşımı kolaylaştırın ve tıklanma istatistiklerini takip edin.
            </p>
          </div>
          
          <UrlShortener />
        </div>
      </div>
    </div>
  );
}
