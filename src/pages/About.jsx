import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Container } from "@mui/material";

const aboutData = {
  title: "من نحن",
  description: "دار الأيتام هي مؤسسة خيرية تأسست بهدف رعاية الأيتام والمحتاجين وتقديم الدعم الكامل لهم في جميع جوانب الحياة.",
  mission: {
    title: "رؤيتنا",
    content: "نطمح إلى أن نكون المؤسسة الرائدة في رعاية الأيتام وتقديم أفضل الخدمات التعليمية والصحية والاجتماعية لهم."
  },
  vision: {
    title: "رسالتنا",
    content: "تقديم رعاية شاملة ومتكاملة للأيتام والمحتاجين، وتمكينهم من خلال التعليم والتدريب لبناء مستقبل أفضل لأنفسهم ومجتمعهم."
  },
  values: [
    {
      title: "الشفافية",
      description: "نؤمن بالشفافية الكاملة في جميع أعمالنا ونتائجنا"
    },
    {
      title: "التعاون",
      description: "نعمل مع شركاء محليين ودوليين لتحقيق أهدافنا"
    },
    {
      title: "التميز",
      description: "نسعى للتميز في جميع الخدمات التي نقدمها"
    }
  ],
  stats: [
    { number: "15+", label: "سنوات من الخبرة" },
    { number: "5000+", label: "طفل تم رعايتهم" },
    { number: "200+", label: "موظف ومتطوع" },
    { number: "50+", label: "مشروع منفذ" }
  ]
};

function About() {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" fontWeight="bold" sx={{ mb: 3, color: "#2e7d32" }}>
            {aboutData.title}
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: "800px", mx: "auto", lineHeight: 1.8 }}>
            {aboutData.description}
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 2, color: "#2e7d32" }}
              >
                {aboutData.mission.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, color: "text.secondary" }}
              >
                {aboutData.mission.content}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 2, color: "#2e7d32" }}
              >
                {aboutData.vision.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, color: "text.secondary" }}
              >
                {aboutData.vision.content}
              </Typography>
            </Box>
          </Grid>
        </Grid>


        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" fontWeight="bold" sx={{ textAlign: "center", mb: 6, color: "#2e7d32" }}>
            قيمنا
          </Typography>
          <Grid container spacing={3}>
            {aboutData.values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: "100%", textAlign: "center", p: 3, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#2e7d32" }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ bgcolor: "#05843cff", borderRadius: 4, p: 6, mb: 8 }}>
          <Typography variant="h3" fontWeight="bold" sx={{ textAlign: "center", mb: 6, color: "white" }}>
            إنجازاتنا بالأرقام
          </Typography>
          <Grid sx={{justifyContent: "center"}} container spacing={7}>
            {aboutData.stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index} sx={{ textAlign: "center" }}>
                <Typography variant="h3" fontWeight="bold" sx={{ color: "white", mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Card sx={{ p: 4, bgcolor: "#f9f9f9" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: "#2e7d32" }}>
              انضم إلينا
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              نحن دائماً نبحث عن متطوعين ومتبرعين كرماء يساعدوننا في تحقيق أهدافنا ومساعدة المزيد من الأيتام والمحتاجين.
              يمكنك المساهمة من خلال التبرع أو التطوع أو كفالة يتيم.
            </Typography>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default About;

