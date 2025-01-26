import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Upload, Search, LineChart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Legal Career Path Optimizer
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your legal resume, discover remote opportunities worldwide,
            and get personalized guidance to fill skill gaps
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/analyze">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <Upload className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Resume Analysis</h3>
                <p className="text-muted-foreground">
                  Upload your legal resume and get intelligent parsing of your
                  skills, experience, and specializations
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <Search className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Job Matching</h3>
                <p className="text-muted-foreground">
                  Our AI scans remote legal positions worldwide that match your
                  profile and experience level
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <LineChart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Skill Gap Analysis</h3>
                <p className="text-muted-foreground">
                  Get personalized recommendations to enhance your profile for
                  specific roles
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Advance Your Legal Career?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start by uploading your resume and discover opportunities that match
            your expertise
          </p>
          <Button asChild size="lg">
            <Link href="/analyze">
              Upload Resume <Upload className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
