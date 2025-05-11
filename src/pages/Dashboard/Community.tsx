
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageCircle, Share2, Medal, Award, Upload, Image as ImageIcon, Video } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Mock data for community posts
const posts = [
  {
    id: 1,
    author: {
      name: "Carlos Almeida",
      role: "Arquiteto Senior",
      avatar: "",
      initials: "CA",
      badges: ["Top Contribuidor", "5+ Anos"],
    },
    content: "Acabei de finalizar um projeto incrível usando mármore Carrara. O contraste com as peças de madeira ficou espetacular! O que acham?",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    video: null,
    category: "projetos",
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: "2h atrás",
    hasLiked: false,
  },
  {
    id: 2,
    author: {
      name: "Ana Paula Costa",
      role: "Vendedora - Pedras Premium",
      avatar: "",
      initials: "AC",
      badges: ["Primeira Venda", "Vendas +100k"],
    },
    content: "Pessoal, alguém tem dicas para apresentação de orçamentos para clientes que ficam em cima do muro? Já tentei várias abordagens mas sempre paro no 'vou pensar e te respondo'.",
    image: null, 
    video: null,
    category: "dúvidas",
    likes: 7,
    comments: 12,
    shares: 0,
    timestamp: "4h atrás",
    hasLiked: true,
  },
  {
    id: 3, 
    author: {
      name: "Roberto Silva",
      role: "CEO - Marmoraria Silva",
      avatar: "",
      initials: "RS",
      badges: ["Top Vendedor Abril", "Premium Member"],
    },
    content: "Acabamos de bater nosso recorde de vendas do mês! Toda equipe está de parabéns. Compartilho aqui nosso segredo: capacitação constante da equipe e acompanhamento próximo do cliente do início ao fim do projeto.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    video: null, 
    category: "conquistas",
    likes: 42,
    comments: 15,
    shares: 7,
    timestamp: "1d atrás",
    hasLiked: false,
  }
];

// Mock data for top users ranking
const topUsers = [
  { name: "Maria Oliveira", points: 350, avatar: "", initials: "MO" },
  { name: "João Silva", points: 320, avatar: "", initials: "JS" },
  { name: "Ana Paula", points: 290, avatar: "", initials: "AP" },
  { name: "Roberto Mendes", points: 275, avatar: "", initials: "RM" },
  { name: "Carla Santos", points: 260, avatar: "", initials: "CS" }
];

const filterOptions = [
  { value: "all", label: "Todos" },
  { value: "dúvidas", label: "Dúvidas" },
  { value: "conquistas", label: "Conquistas" },
  { value: "projetos", label: "Projetos" },
  { value: "vendas", label: "Vendas" },
  { value: "dicas", label: "Dicas" }
];

const sortOptions = [
  { value: "recent", label: "Mais Recentes" },
  { value: "popular", label: "Mais Populares" },
  { value: "region", label: "Minha Região" }
];

const Community = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("recent");
  const [newPostText, setNewPostText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(posts);
  
  const handleLike = (postId: number) => {
    setVisiblePosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.hasLiked ? post.likes - 1 : post.likes + 1, hasLiked: !post.hasLiked } 
        : post
    ));
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setVisiblePosts(posts);
    } else {
      setVisiblePosts(posts.filter(post => post.category === filter));
    }
  };

  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
    // In a real application, would implement sorting logic here
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would submit to API
    alert("Post enviado! Em um app real, este conteúdo seria enviado para uma API.");
    setNewPostText("");
    setSelectedFiles([]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Column */}
        <div className="w-full lg:w-8/12 space-y-6">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold mb-2">Comunidade</h1>
            <p className="text-stone-500 mb-6">Compartilhe experiências e conecte-se com outros profissionais</p>
          </motion.div>

          {/* Post Creation Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Criar Publicação</CardTitle>
                <CardDescription>Compartilhe dúvidas, conquistas ou projetos com a comunidade</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost}>
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="O que você está pensando hoje?" 
                      className="min-h-[100px]"
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                    />
                    
                    {selectedFiles.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto py-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="relative rounded-md overflow-hidden bg-stone-100 h-20 w-20">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-0 right-0 h-5 w-5 bg-stone-800/70 text-white rounded-full m-1 p-0"
                              onClick={() => handleRemoveFile(index)}
                            >
                              ✕
                            </Button>
                            {file.type.startsWith('image/') ? (
                              <img 
                                src={URL.createObjectURL(file)} 
                                alt="Preview" 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full w-full">
                                <Video className="h-8 w-8 text-stone-500" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.map(option => (
                        option.value !== "all" && (
                          <Badge 
                            key={option.value}
                            variant={activeFilter === option.value ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleFilterChange(option.value)}
                          >
                            {option.label}
                          </Badge>
                        )
                      ))}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-stone-600" onClick={() => document.getElementById('image-upload')?.click()}>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Imagem
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-stone-600" onClick={() => document.getElementById('video-upload')?.click()}>
                    <Video className="h-4 w-4 mr-2" />
                    Vídeo
                    <input
                      type="file"
                      id="video-upload"
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </Button>
                </div>
                <Button 
                  onClick={handleSubmitPost} 
                  disabled={newPostText.trim() === '' && selectedFiles.length === 0}
                >
                  Publicar
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Filter and Sort */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Tabs defaultValue={activeFilter} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-3 sm:grid-cols-6">
                {filterOptions.map(option => (
                  <TabsTrigger 
                    key={option.value} 
                    value={option.value}
                    onClick={() => handleFilterChange(option.value)}
                  >
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Tabs defaultValue={activeSort} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-3">
                {sortOptions.map(option => (
                  <TabsTrigger 
                    key={option.value} 
                    value={option.value}
                    onClick={() => handleSortChange(option.value)}
                  >
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Posts List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {visiblePosts.length > 0 ? (
              visiblePosts.map(post => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-amber-100">
                            {post.author.avatar ? (
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            ) : (
                              <AvatarFallback className="bg-amber-100 text-amber-800">{post.author.initials}</AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-sm">{post.author.name}</h3>
                              <Badge variant="outline" className="text-xs bg-amber-50">
                                {post.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-stone-500">{post.author.role}</p>
                          </div>
                        </div>
                        <span className="text-xs text-stone-400">{post.timestamp}</span>
                      </div>
                      {post.author.badges.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {post.author.badges.map((badge, idx) => (
                            <div key={idx} className="flex items-center bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full">
                              {idx === 0 ? <Award className="h-3 w-3 mr-1" /> : <Medal className="h-3 w-3 mr-1" />}
                              {badge}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-sm mb-4">{post.content}</p>
                      {post.image && (
                        <div className="rounded-lg overflow-hidden mb-2">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-auto object-cover rounded-md"
                            loading="lazy" 
                          />
                        </div>
                      )}
                      {post.video && (
                        <div className="rounded-lg overflow-hidden mb-2 aspect-video bg-stone-100 flex items-center justify-center">
                          <Video className="h-12 w-12 text-stone-400" />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      <div className="flex justify-between items-center w-full">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`text-xs gap-1.5 ${post.hasLiked ? 'text-amber-600' : 'text-stone-500'}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-stone-500 text-xs gap-1.5">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-stone-500 text-xs gap-1.5">
                          <Share2 className="h-4 w-4" />
                          <span>{post.shares}</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="py-12 flex flex-col items-center justify-center bg-stone-50/50">
                <CardContent className="text-center space-y-4">
                  <div className="mx-auto bg-amber-100 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-medium">Nenhuma publicação encontrada</h3>
                  <p className="text-stone-500 text-sm max-w-md">
                    Não encontramos publicações com este filtro. Tente outro filtro ou seja o primeiro a publicar algo nesta categoria!
                  </p>
                  <Button onClick={() => handleFilterChange('all')}>Ver Todas as Publicações</Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Sidebar Column */}
        <div className="w-full lg:w-4/12 space-y-6">
          {/* Profile Card */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-2">
                  <Avatar className="h-20 w-20 border-2 border-amber-100">
                    <AvatarFallback className="text-lg bg-amber-100 text-amber-800">JS</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>João Silva</CardTitle>
                <CardDescription>Diretor Comercial - Pedras Premium</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-4">
                <div className="flex justify-center gap-2">
                  <Badge variant="outline" className="bg-amber-50">
                    <Award className="h-3 w-3 mr-1" />
                    Top Vendedor
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50">
                    <Medal className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-stone-500 mb-1">Bio</p>
                  <p className="text-sm">Especialista em pedras exóticas com mais de 15 anos no mercado. Atendendo clientes premium em todo Brasil.</p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="outline" className="w-full">Editar Perfil</Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Top Users Ranking */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Award className="h-5 w-5 mr-2 text-amber-500" />
                  Top Contribuidores
                  <Badge className="ml-2">Maio 2023</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8 border border-amber-100">
                            <AvatarFallback className="bg-amber-100 text-amber-800">{user.initials}</AvatarFallback>
                          </Avatar>
                          {index < 3 && (
                            <div className={`absolute -bottom-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ${
                              index === 0 ? 'bg-amber-500 text-white' :
                              index === 1 ? 'bg-stone-400 text-white' :
                              'bg-amber-700 text-white'
                            }`}>
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium">{user.name}</span>
                      </div>
                      <div className="text-sm font-bold text-amber-600">{user.points}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="link" className="w-full">Ver Ranking Completo</Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          {/* Resources Card */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recursos</CardTitle>
                <CardDescription>Conteúdos úteis para potencializar seus resultados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Guia de Vendas 2023
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Catálogo de Materiais
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Templates de Orçamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Community;
