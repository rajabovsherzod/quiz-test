
import { Button } from "@/components/base/buttons/button";
import Link from "next/link";
import { BookOpen, Users, Trophy, Activity, ClipboardList } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-bg-secondary dark:bg-gray-900 flex flex-col relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-50 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-6 dark:bg-brand-900/30 dark:border-brand-800 dark:text-brand-300">
          <Trophy className="w-4 h-4" />
          <span>Bilimingizni sinab ko'ring</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
          Quiz Platformasi
        </h1>
        <p className="text-xl text-tertiary max-w-2xl mx-auto leading-relaxed">
          O'z bilimingizni tekshirish uchun quyidagi fanlardan birini tanlang va natijalaringizni kuzatib boring.
        </p>
      </section>

      {/* Cards Section */}
      <section className="flex-1 flex flex-col items-center justify-start px-4 pb-20 z-10">
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

          {/* Card 1: Sport Pedagogikasi */}
          <div className="bg-bg-primary dark:bg-gray-800 rounded-3xl p-8 shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-border-secondary hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 dark:bg-brand-900/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-brand-100 dark:group-hover:bg-brand-900/20" />

            <div className="w-16 h-16 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900 dark:to-brand-800 rounded-2xl flex items-center justify-center mb-6 text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
              <BookOpen className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              Sport Pedagogikasi
            </h2>
            <p className="text-tertiary mb-8 leading-relaxed">
              Jismoniy tarbiya va sport sohasidagi ta‘lim jarayonini o‘rganuvchi fan bo‘yicha fundamental testlar to'plami.
            </p>

            <div className="mt-auto">
              <Link href="/quiz/pedagogika" className="w-full block">
                <Button size="xl" className="w-full justify-center bg-brand-600 hover:bg-brand-700 text-white border-transparent transition-all shadow-md shadow-brand-500/20 group-hover:shadow-brand-500/40">
                  Boshlash
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: To'garak */}
          <div className="bg-bg-primary dark:bg-gray-800 rounded-3xl p-8 shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-border-secondary hover:border-green-300 dark:hover:border-green-700 hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 dark:bg-green-900/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-green-100 dark:group-hover:bg-green-900/20" />

            <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
              <Users className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              To'garaklarni Tashkil Qilish
            </h2>
            <p className="text-tertiary mb-8 leading-relaxed">
              Sport to'garaklarini tashkil qilish, boshqarish va rivojlantirish bo'yicha amaliy va nazariy bilimlar.
            </p>

            <div className="mt-auto">
              <Link href="/quiz/togarak" className="w-full block">
                <Button size="xl" color="primary" className="w-full justify-center bg-green-600 hover:bg-green-700 text-white border-transparent shadow-md shadow-green-500/20 group-hover:shadow-green-500/40">
                  Boshlash
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 3: Jismoniy Tarbiya */}
          <div className="bg-bg-primary dark:bg-gray-800 rounded-3xl p-8 shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-border-secondary hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20" />

            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
              <Activity className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Jismoniy Tarbiya va Sport
            </h2>
            <p className="text-tertiary mb-8 leading-relaxed">
              Jismoniy tarbiya va sport sohasida ilmiy faoliyatni tashkil qilish bo'yicha chuqurlashtirilgan testlar.
            </p>

            <div className="mt-auto">
              <Link href="/quiz/jismoniy-tarbiya" className="w-full block">
                <Button size="xl" color="primary" className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40">
                  Boshlash
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 4: Ilmiy Tadqiqot Metodologiyasi */}
          <div className="bg-bg-primary dark:bg-gray-800 rounded-3xl p-8 shadow-lg shadow-gray-200/50 dark:shadow-black/30 border border-border-secondary hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 dark:bg-purple-900/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20" />

            <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
              <ClipboardList className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Ilmiy Tadqiqot Metodologiyasi
            </h2>
            <p className="text-tertiary mb-8 leading-relaxed">
              Ilmiy tadqiqot asoslari, metodlari va ularni amaliyotda qo'llash bo'yicha testlar to'plami.
            </p>

            <div className="mt-auto">
              <Link href="/quiz/metodologiya" className="w-full block">
                <Button size="xl" color="primary" className="w-full justify-center bg-purple-600 hover:bg-purple-700 text-white border-transparent shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40">
                  Boshlash
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      <footer className="py-8 text-center text-sm text-tertiary border-t border-border-secondary/50 bg-bg-primary/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <p>© 2026 Quiz Platformasi. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}
