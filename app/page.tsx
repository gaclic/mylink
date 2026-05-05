"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Link as LinkType } from "@/data/links";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, doc, updateDoc, deleteDoc, where, limit } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Pencil, Trash2, X, Check } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import { LandingPage } from "@/components/LandingPage";

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "링크 제목을 입력해주세요." }),
  url: z.string().trim()
    .min(1, { message: "URL 주소를 입력해주세요." })
    .url({ message: "올바른 URL 형식을 입력해주세요. (예: https://...)" }),
});

import { useGetLinks, useAddLink, useUpdateLink, useDeleteLink } from "@/hooks/useLinksQuery";
import { useProfileQuery, useUpdateProfileMutation } from "@/hooks/useProfileQuery";

const LinkCardItem = ({
  link,
  index,
  uid,
}: {
  link: LinkType;
  index: number;
  uid: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const updateLinkMutation = useUpdateLink(uid);
  const deleteLinkMutation = useDeleteLink(uid);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
    },
  });

  const onUpdateSubmit = async (values: z.infer<typeof formSchema>) => {
    updateLinkMutation.mutate(
      { id: link.id, title: values.title, url: values.url },
      {
        onSuccess: () => {
          setIsEditing(false);
        }
      }
    );
  };

  const handleDelete = async () => {
    deleteLinkMutation.mutate(link.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      }
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    reset({ title: link.title, url: link.url });
    setIsEditing(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    reset({ title: link.title, url: link.url }); // Revert to newest link values
    setIsEditing(false);
  };

  let domain = "example.com";
  try {
    domain = new URL(link.url).hostname;
  } catch (e) {
    // fallback
  }
  const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=64`;

  // Delete modal rendering alongside the item
  const deleteDialog = (
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl border-white/40 dark:border-zinc-800/50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl" showCloseButton={!deleteLinkMutation.isPending}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">정말 삭제하시겠습니까?</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-2">
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong>{link.title}</strong> 링크를 목록에서 삭제합니다.
          </p>
          <p className="text-red-500 font-semibold mt-2">이 작업은 되돌릴 수 없습니다.</p>
        </div>
        <DialogFooter className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={deleteLinkMutation.isPending} className="rounded-xl border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteLinkMutation.isPending}
            className="rounded-xl font-semibold shadow-sm min-w-[80px]"
          >
            {deleteLinkMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "삭제하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (isEditing) {
    return (
      <div
        className="block w-full outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 rounded-2xl group"
        style={{ animation: `slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both` }}
      >
        <Card className="relative overflow-visible w-full p-4 flex flex-col items-start bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-indigo-200 dark:border-indigo-900/50 shadow-md rounded-2xl">
          <form onSubmit={handleSubmit(onUpdateSubmit)} className="w-full flex-col flex gap-4">
            <div className="flex gap-4 items-start w-full">
              <div className="relative z-10 flex justify-center pt-2">
                {/* Empty avatar space or favicon display. A small favicon is okay */}
                <img
                  src={faviconUrl}
                  alt={`${link.title} icon`}
                  className="w-6 h-6 object-contain drop-shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>';
                  }}
                />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <Input
                    placeholder="링크 제목"
                    className={`h-10 px-3 rounded-lg dark:bg-zinc-800 ${errors.title ? 'border-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-700'}`}
                    autoFocus
                    {...register("title")}
                  />
                  {errors.title && <p className="text-xs text-red-500 font-medium px-1">{errors.title.message as string}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    type="text"
                    placeholder="URL 주소 (https://...)"
                    className={`h-10 px-3 rounded-lg dark:bg-zinc-800 ${errors.url ? 'border-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-700'}`}
                    {...register("url")}
                  />
                  {errors.url && <p className="text-xs text-red-500 font-medium px-1">{errors.url.message as string}</p>}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 w-full border-t border-zinc-100 dark:border-zinc-800 pt-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancelEdit}
                disabled={updateLinkMutation.isPending}
                className="rounded-lg h-9 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-4 h-4 mr-1" />
                취소
              </Button>
              <Button
                type="submit"
                disabled={updateLinkMutation.isPending}
                className="rounded-lg h-9 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold disabled:opacity-70 min-w-[64px]"
              >
                {updateLinkMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    저장
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <>
      {deleteDialog}
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 rounded-2xl group"
        style={{
          animation: `slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`,
        }}
      >
        <Card className="relative overflow-hidden w-full p-4 flex items-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/40 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl pr-2">
          {/* Hover Graphic */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-zinc-700/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

          {/* Favicon */}
          <div className="relative z-10 w-12 flex justify-center shrink-0">
            <img
              src={faviconUrl}
              alt={`${link.title} icon`}
              className="w-6 h-6 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>';
              }}
            />
          </div>

          {/* Title */}
          <div className="relative z-10 flex-1 flex flex-col justify-center overflow-hidden pr-2">
            <span className="text-center font-semibold text-[15px] tracking-wide text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate block">
              {link.title}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex items-center gap-1 shrink-0 bg-white/50 dark:bg-zinc-800/50 sm:bg-transparent sm:dark:bg-transparent p-1 rounded-xl shadow-sm sm:shadow-none backdrop-blur-sm sm:backdrop-blur-none transition-colors">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-zinc-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30"
              onClick={handleEditClick}
              title="수정하기"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:text-zinc-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
              onClick={handleDeleteClick}
              title="삭제하기"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </a>
    </>
  );
};

export default function Page() {
  const { user, isLoading: isAuthLoading } = useUser();
  const { data: profile, isLoading: isProfileLoading } = useProfileQuery(user);
  
  const { data: links = [], isLoading: isLoadingLinks } = useGetLinks(user?.uid);
  const addLinkMutation = useAddLink(user?.uid);
  const updateProfileMutation = useUpdateProfileMutation(user?.uid);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Profile Edit State
  const [editingField, setEditingField] = useState<"displayName" | "username" | "bio" | null>(null);
  const [editValue, setEditValue] = useState("");
  const [profileError, setProfileError] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const startEditField = (field: "displayName" | "username" | "bio", currentValue: string | null) => {
    setEditingField(field);
    setEditValue(currentValue || "");
    setProfileError("");
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setProfileError("");
  };

  const handleSaveField = async () => {
    if (!user || !profile || !editingField) return;
    
    const trimmedValue = editValue.trim();
    
    if (!trimmedValue) {
      setProfileError(editingField === "bio" ? "소개글을 입력해주세요." : "내용을 입력해주세요.");
      return;
    }
    
    setIsSavingProfile(true);
    setProfileError("");
    
    try {
      if (editingField === "displayName" && trimmedValue !== profile.displayName) {
        // check duplicate display name
        const q = query(collection(db, "users"), where("displayName", "==", trimmedValue), limit(1));
        const snapshot = await getDocs(q);
        const duplicateDoc = snapshot.docs.find(d => d.id !== user.uid);
        if (duplicateDoc) {
          setProfileError("이미 사용 중인 이름입니다.");
          setIsSavingProfile(false);
          return;
        }
      }
      
      if (editingField === "username" && trimmedValue !== profile.username) {
        // check duplicate username
        const q = query(collection(db, "users"), where("username", "==", trimmedValue), limit(1));
        const snapshot = await getDocs(q);
        const duplicateDoc = snapshot.docs.find(d => d.id !== user.uid);
        if (duplicateDoc) {
          setProfileError("이미 사용 중인 @username입니다.");
          setIsSavingProfile(false);
          return;
        }
      }
      await updateProfileMutation.mutateAsync({ [editingField]: trimmedValue });
      
      setEditingField(null);
    } catch (error) {
      console.error("Error updating profile field:", error);
      setProfileError("업데이트 중 오류가 발생했습니다.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    addLinkMutation.mutate(
      { title: values.title, url: values.url },
      {
        onSuccess: () => {
          reset();
          setIsDialogOpen(false);
        }
      }
    );
  };

  if (isAuthLoading || isProfileLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user || !profile) {
    return <LandingPage />;
  }

  return (
    <main className="flex min-h-svh flex-col items-center py-10 px-6 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden relative">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <img
            src={profile.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full shadow-lg border-4 border-white dark:border-zinc-800 object-cover bg-indigo-100 dark:bg-zinc-800"
            referrerPolicy="no-referrer"
          />

          {/* Display Name Edit Block */}
          {editingField === "displayName" ? (
            <div className="mt-5 w-full flex flex-col items-center gap-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="표시 이름"
                className={`text-center font-extrabold max-w-[220px] h-10 text-lg ${profileError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveField(); }}
              />
              {profileError && <p className="text-xs font-medium text-red-500">{profileError}</p>}
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={handleCancelEdit} disabled={isSavingProfile} className="rounded-lg h-8 px-3 text-xs shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">취소</Button>
                <Button type="button" size="sm" onClick={handleSaveField} disabled={isSavingProfile} className="rounded-lg h-8 px-4 text-xs shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white">
                  {isSavingProfile ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Check className="w-3 h-3 mr-1" />}
                  저장
                </Button>
              </div>
            </div>
          ) : (
            <h1 
              className="mt-5 text-2xl tracking-tight font-extrabold text-zinc-900 dark:text-zinc-50 flex items-center justify-center gap-2 cursor-pointer group px-4 py-1 rounded-xl hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 transition-colors relative"
              onClick={() => startEditField("displayName", profile.displayName)}
              title="디스플레이 네임 수정"
            >
              {profile.displayName || "이름 없음"}
              <Pencil className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all absolute -right-2 top-1/2 -translate-y-1/2" />
            </h1>
          )}

          {/* Username Edit Block */}
          {editingField === "username" ? (
            <div className="mt-1 w-full flex flex-col items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-zinc-500 font-bold text-sm">@</span>
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="username"
                  className={`text-center font-medium max-w-[160px] h-8 text-sm placeholder:italic ${profileError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  autoFocus
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSaveField(); }}
                />
              </div>
              {profileError && <p className="text-xs font-medium text-red-500">{profileError}</p>}
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={handleCancelEdit} disabled={isSavingProfile} className="rounded-lg h-7 px-3 text-xs shadow-sm">취소</Button>
                <Button type="button" size="sm" onClick={handleSaveField} disabled={isSavingProfile} className="rounded-lg h-7 px-4 text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                  {isSavingProfile ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Check className="w-3 h-3 mr-1" />}
                  저장
                </Button>
              </div>
            </div>
          ) : (
            <h2
              className="mt-0.5 text-[15px] font-semibold text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1 cursor-pointer group px-3 py-1 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors relative"
              onClick={() => startEditField("username", profile.username)}
              title="유저네임 수정"
            >
              @{profile.username}
              <Pencil className="w-3 h-3 text-zinc-300 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all absolute -right-3 top-1/2 -translate-y-1/2" />
            </h2>
          )}

          {/* Bio Edit Block */}
          {editingField === "bio" ? (
            <div className="mt-4 w-full flex flex-col items-center gap-3">
              <textarea
                ref={(el) => {
                  if (el) {
                    el.style.height = "auto";
                    el.style.height = `${el.scrollHeight}px`;
                  }
                }}
                value={editValue}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length <= 200) {
                    setEditValue(val);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }
                }}
                maxLength={200}
                rows={1}
                placeholder="소개글을 입력하세요 (최대 200자)"
                className={`w-full max-w-[320px] min-h-[44px] overflow-hidden p-3 text-center text-sm rounded-xl border ${profileError ? 'border-red-500 ring-1 ring-red-500' : 'border-zinc-200 dark:border-zinc-700'} bg-white dark:bg-zinc-900/50 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm`}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveField();
                  }
                }}
              />
              <div className="w-full max-w-[320px] flex justify-end px-2 -mt-1">
                <span className={`text-[11px] font-medium tracking-wide ${editValue.length >= 200 ? 'text-red-500' : 'text-zinc-400'}`}>
                  {editValue.length} / 200
                </span>
              </div>
              {profileError && <p className="text-xs font-medium text-red-500 px-4 text-center break-keep">{profileError}</p>}
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={handleCancelEdit} disabled={isSavingProfile} className="rounded-lg h-8 px-4 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <X className="w-3.5 h-3.5 mr-1" />취소
                </Button>
                <Button type="button" size="sm" onClick={handleSaveField} disabled={isSavingProfile} className="rounded-lg h-8 px-4 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                  {isSavingProfile ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Check className="w-3.5 h-3.5 mr-1" />}
                  저장
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="mt-3 text-zinc-500 dark:text-zinc-400 text-center text-sm font-medium px-6 py-2 leading-relaxed whitespace-pre-wrap cursor-pointer group rounded-xl hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 transition-colors relative max-w-[340px]"
              onClick={() => startEditField("bio", profile.bio)}
              title="소개글 수정"
            >
              {profile.bio || "소개글을 입력해보세요 ✎"}
              <Pencil className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all absolute right-0 top-2" />
            </div>
          )}
        </div>

        {/* Add Link Button */}
        <div className="w-full mb-6">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              reset();
            }
          }}>
            <DialogTrigger render={
              <Button className="w-full rounded-2xl h-12 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                새로운 링크 추가하기
              </Button>
            } />
            <DialogContent className="sm:max-w-md rounded-2xl border-white/40 dark:border-zinc-800/50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">링크 추가</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4">
                <div className="flex flex-col gap-2 relative">
                  <Label htmlFor="title" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    링크 제목
                  </Label>
                  <Input
                    id="title"
                    placeholder="예: 내 포트폴리오 빙글 빙글"
                    className={`h-12 px-4 rounded-xl focus-visible:ring-indigo-500 dark:bg-zinc-800 ${errors.title ? 'border-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-700'}`}
                    autoFocus
                    {...register("title")}
                  />
                  {errors.title && <p className="text-sm font-medium text-red-500">{errors.title.message as string}</p>}
                </div>
                <div className="flex flex-col gap-2 relative">
                  <Label htmlFor="url" className="font-semibold text-zinc-700 dark:text-zinc-300">
                    URL 주소
                  </Label>
                  <Input
                    id="url"
                    type="text"
                    placeholder="예: https://example.com"
                    className={`h-12 px-4 rounded-xl focus-visible:ring-indigo-500 dark:bg-zinc-800 ${errors.url ? 'border-red-500 focus-visible:ring-red-500' : 'border-zinc-200 dark:border-zinc-700'}`}
                    {...register("url")}
                  />
                  {errors.url && <p className="text-sm font-medium text-red-500">{errors.url.message as string}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={addLinkMutation.isPending}
                  className="mt-2 h-12 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-md disabled:opacity-70"
                >
                  {addLinkMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      리스트에 추가하기
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Links Section */}
        <div className="w-full flex flex-col gap-4">
          {isLoadingLinks ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
          ) : links.length === 0 ? (
            <div className="text-center p-8 text-zinc-500 dark:text-zinc-400">아직 추가된 링크가 없습니다.</div>
          ) : (
            links.map((link, index) => (
              <LinkCardItem
                key={link.id}
                link={link}
                index={index}
                uid={user.uid}
              />
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </main>
  );
}
