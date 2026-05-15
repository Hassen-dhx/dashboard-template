import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/contexts/theme-provider"
import {
  BarChart3,
  Bell,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  DollarSign,
  Home,
  LineChart,
  LogOut,
  Menu,
  Moon,
  Package,
  PanelLeftClose,
  Settings,
  ShoppingCart,
  Sun,
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Languages,
} from "lucide-react"

const LANGUAGES = [
  { code: "en", label: "language.en", flag: "🇬🇧" },
  { code: "fr", label: "language.fr", flag: "🇫🇷" },
  { code: "ar", label: "language.ar", flag: "🇸🇦" },
]

const RTL_LANGS = ["ar"]

function Sidebar({ open, onClose, collapsed }: { open: boolean; onClose: () => void; collapsed: boolean }) {
  const { t } = useTranslation()

  const sidebarLinks = [
    { label: t("sidebar.dashboard"), icon: Home, active: true },
    { label: t("sidebar.analytics"), icon: BarChart3 },
    { label: t("sidebar.orders"), icon: ShoppingCart },
    { label: t("sidebar.products"), icon: Package },
    { label: t("sidebar.customers"), icon: Users },
    { label: t("sidebar.transactions"), icon: CreditCard },
    { label: t("sidebar.reports"), icon: LineChart },
    { label: t("sidebar.settings"), icon: Settings },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-sidebar-background transition-all duration-300 lg:static lg:translate-x-0",
          collapsed ? "w-16" : "w-64",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className={cn(
          "flex h-14 items-center border-b",
          collapsed ? "justify-center px-0" : "gap-2 px-6"
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold text-sidebar-foreground truncate">{t("app.title")}</span>
          )}
        </div>

        {/* Nav links */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <button
                key={link.label}
                className={cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors",
                  collapsed
                    ? "justify-center py-2 px-0 w-full"
                    : "gap-3 px-3 py-2",
                  link.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                title={collapsed ? link.label : undefined}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {!collapsed && link.label}
              </button>
            ))}
          </nav>
        </ScrollArea>

        {/* User profile */}
        <div className="border-t p-3">
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "gap-3"
          )}>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=AD" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="text-sm min-w-0 flex-1">
                <p className="font-medium text-sidebar-accent-foreground truncate">Admin User</p>
                <p className="text-sidebar-foreground truncate">admin@acme.com</p>
              </div>
            )}
          </div>
        </div>


      </aside>
    </>
  )
}

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebarCollapsed") === "true"
    } catch {
      return false
    }
  })
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  const currentLang = i18n.language?.startsWith("ar") ? "ar" : i18n.language?.startsWith("fr") ? "fr" : "en"
  const isRTL = RTL_LANGS.includes(currentLang)

  // Set <html dir> for RTL support
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = currentLang
  }, [currentLang, isRTL])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const stats = [
    {
      title: t("stats.totalRevenue"),
      value: "$45,231.89",
      change: "+20.1%",
      up: true,
      icon: DollarSign,
    },
    {
      title: t("stats.subscriptions"),
      value: "2,350",
      change: "+180.1%",
      up: true,
      icon: TrendingUp,
    },
    {
      title: t("stats.sales"),
      value: "12,234",
      change: "+19%",
      up: true,
      icon: ShoppingCart,
    },
    {
      title: t("stats.activeNow"),
      value: "573",
      change: "-7.2%",
      up: false,
      icon: Activity,
    },
  ]

  const recentOrders = [
    { id: "#1234", customer: "John Doe", email: "john@example.com", product: "Pro Plan", amount: "$49.00", status: "completed" as const },
    { id: "#1235", customer: "Jane Smith", email: "jane@example.com", product: "Starter Kit", amount: "$29.00", status: "processing" as const },
    { id: "#1236", customer: "Bob Wilson", email: "bob@example.com", product: "Enterprise License", amount: "$299.00", status: "completed" as const },
    { id: "#1237", customer: "Alice Brown", email: "alice@example.com", product: "Pro Plan", amount: "$49.00", status: "failed" as const },
    { id: "#1238", customer: "Charlie Davis", email: "charlie@example.com", product: "Team Plan", amount: "$149.00", status: "processing" as const },
  ]

  const weeklyData = [
    { day: "Mon", value: 1200 },
    { day: "Tue", value: 2100 },
    { day: "Wed", value: 1800 },
    { day: "Thu", value: 2400 },
    { day: "Fri", value: 3100 },
    { day: "Sat", value: 2200 },
    { day: "Sun", value: 1600 },
  ]

  const maxValue = Math.max(...weeklyData.map((d) => d.value))

  const statusStyles: Record<string, string> = {
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    processing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }

  const statusLabels: Record<string, string> = {
    completed: t("orders.completed"),
    processing: t("orders.processing"),
    failed: t("orders.failed"),
  }

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem("sidebarCollapsed", String(next))
      } catch {}
      return next
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={sidebarCollapsed} />

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Sidebar collapse toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex"
            onClick={toggleSidebarCollapse}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeftClose className={cn("h-5 w-5 transition-transform", sidebarCollapsed && "rotate-180")} />
          </Button>

          <div className="hidden sm:flex relative flex-1 max-w-md">
            <Search className={cn(
              "absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
              isRTL ? "right-3" : "left-3"
            )} />
            <input
              type="search"
              placeholder={t("app.search")}
              className={cn(
                "w-full rounded-lg border bg-muted/50 pl-9 pr-4 py-2 text-sm outline-none focus:border-ring focus:bg-background",
                isRTL && "pr-9 pl-4"
              )}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex" title={t("language.en")}>
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>{t("language.en")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(currentLang === lang.code && "bg-accent font-medium")}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {t(lang.label)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === "light" ? t("theme.dark") : t("theme.light")}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                3
              </span>
            </Button>

            <Separator orientation="vertical" className="h-8" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=AD" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">Admin</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{t("app.myAccount")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4" />
                  {t("app.settings")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4" />
                  {t("app.logOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Page title */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
              <p className="text-sm text-muted-foreground">
                {t("dashboard.description")}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="sm">
                {t("app.download")}
              </Button>
              <Button size="sm">{t("app.createReport")}</Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="rounded-lg bg-muted p-2">
                    <stat.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={cn(
                    "mt-1 flex items-center text-xs",
                    stat.up ? "text-emerald-600" : "text-red-600"
                  )}>
                    {stat.up ? (
                      <ArrowUpRight className={cn("mr-1 h-3 w-3", isRTL && "mr-0 ml-1")} />
                    ) : (
                      <ArrowDownRight className={cn("mr-1 h-3 w-3", isRTL && "mr-0 ml-1")} />
                    )}
                    {stat.change} {t("stats.fromLastMonth")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts & Recent Orders */}
          <div className="grid gap-6 lg:grid-cols-7">
            {/* Chart */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>{t("dashboard.revenueOverview")}</CardTitle>
                <CardDescription>
                  {t("dashboard.revenueDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-48">
                  {weeklyData.map((item) => (
                    <div key={item.day} className="flex flex-1 flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-medium text-muted-foreground">
                        ${(item.value / 1000).toFixed(1)}k
                      </span>
                      <div
                        className="w-full rounded-md bg-primary/80 transition-all hover:bg-primary"
                        style={{ height: `${(item.value / maxValue) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{item.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>{t("dashboard.recentOrders")}</CardTitle>
                <CardDescription>{t("dashboard.recentOrdersDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between px-6 py-3 text-sm"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{order.customer}</span>
                        <span className="text-muted-foreground truncate">{order.product}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{order.amount}</span>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                            statusStyles[order.status as keyof typeof statusStyles]
                          )}
                        >
                          {statusLabels[order.status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs section */}
          <Card>
            <CardHeader>
              <Tabs defaultValue="overview" className="w-full">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>{t("analytics.title")}</CardTitle>
                    <CardDescription>
                      {t("analytics.description")}
                    </CardDescription>
                  </div>
                  <TabsList>
                    <TabsTrigger value="overview">{t("analytics.overview")}</TabsTrigger>
                    <TabsTrigger value="revenue">{t("analytics.revenue")}</TabsTrigger>
                    <TabsTrigger value="users">{t("analytics.users")}</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="overview" className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { label: t("analytics.pageViews"), value: "124,592", change: "+12.3%" },
                      { label: t("analytics.conversionRate"), value: "3.24%", change: "+0.8%" },
                      { label: t("analytics.avgSession"), value: "4m 32s", change: "+2.1%" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="mt-1 text-2xl font-bold">{item.value}</p>
                        <p className="mt-1 text-xs text-emerald-600">{item.change}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="revenue" className="mt-6">
                  <div className="flex h-40 items-center justify-center rounded-lg border">
                    <p className="text-sm text-muted-foreground">{t("analytics.revenueComingSoon")}</p>
                  </div>
                </TabsContent>
                <TabsContent value="users" className="mt-6">
                  <div className="flex h-40 items-center justify-center rounded-lg border">
                    <p className="text-sm text-muted-foreground">{t("analytics.usersComingSoon")}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </main>
      </div>
    </div>
  )
}
