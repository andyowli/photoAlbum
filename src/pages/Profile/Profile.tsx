import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Mail, User, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/contexts/SettingsContext";

export default function Profile() {
  const [avatar, setAvatar] = useState("https://picsum.photos/400/300?random=2");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { t } = useSettings();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (previewUrl) {
      setAvatar(previewUrl);
      setPreviewUrl(null);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{t('profile')}</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-8">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src={avatar} alt={t('profile')} className="object-cover" />
                                <AvatarFallback>
                                    <User className="w-12 h-12" />
                                </AvatarFallback>
                            </Avatar>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="absolute bottom-0 right-0 rounded-full bg-white"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Update Profile Picture</DialogTitle>
                                        <DialogDescription>
                                            {t('choosePicture')}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        {previewUrl && (
                                            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                            <img
                                                src={previewUrl}
                                                alt={t('preview')}
                                                className="w-full h-full object-cover"
                                            />
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                className="absolute top-2 right-2"
                                                onClick={() => setPreviewUrl(null)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                            </div>
                                        )}
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Input
                                                id="picture"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={handleCancel}
                                                className="dark:text-white"
                                            >
                                                {t('cancel')}
                                            </Button>
                                            <Button
                                                onClick={handleUpload}
                                                disabled={!previewUrl}
                                            >
                                                {t('upload')}
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>


                        <h2 className="text-xl font-semibold">John Doe</h2>
                        <p className="text-sm text-muted-foreground">Member since Jan 2024</p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t('fullName')}</Label>
                            <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="name"
                                placeholder="Your full name"
                                className="pl-9"
                                defaultValue="John Doe"
                            />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('email')}</Label>
                            <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="Your email"
                                className="pl-9"
                                defaultValue="john@example.com"
                            />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button>{t('saveChanges')}</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}