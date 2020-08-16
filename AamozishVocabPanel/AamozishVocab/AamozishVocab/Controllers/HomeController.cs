using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using AamozishVocab.DataLayer;
using AamozishVocab.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using AamozishVocab.MongoDAL;
using MongoDB.Driver.Builders;

namespace AamozishVocab.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ViewCategory()
        {
            return View();
        }
        public ActionResult FillCatgeoryGrid()
        {
            ILMEntities d = new ILMEntities();
            var mc = new MongoConnector();
            return Json(mc.GetAllCategory(), JsonRequestBehavior.AllowGet);
        }
        [AllowAnonymous]
        public ActionResult AddCategory(Guid? Id)
        {
            var mc = new MongoConnector();
            if (Id != null)
            {
                ViewBag.Action = "Edit";
                var CatData = (from s in mc.GetAllCategory() where s.Id == Id select s).FirstOrDefault();
                return View("AddCategory", CatData);
            }
            else
            {
                ViewBag.Action = "New";
                var Rowcount = (from s in mc.GetAllCategory() orderby s.SerialNo descending select s.SerialNo).FirstOrDefault();
                IlmCategoryModel obj = new IlmCategoryModel();
                obj.Id = Guid.NewGuid();
                obj.IsActive = true;
                obj.SerialNo = (Rowcount ?? 0) + 1;
                return View("AddCategory", obj);
            }
        }
        [HttpPost]
        public ActionResult AddCategory(IlmCategoryModel obj)
        {
            var mc = new MongoConnector();
            try
            {
                int HaveImage = 0;
                string fileExt = null;
                string Slug = string.Empty;
                if (obj.Image != null)
                {
                    var fileName = obj.Image.FileName;
                    var FileLength = obj.Image.ContentLength;
                    fileExt = Path.GetExtension(obj.Image.FileName);

                    if (FileLength / 1000 > 200)
                    {
                        return Json(new { success = false, responseText = "Please upload File Size less than 200kb !!" }, JsonRequestBehavior.AllowGet);

                    }
                    if (fileExt.ToUpper() != ".PNG" && fileExt.ToUpper() != ".JPG")
                    {
                        return Json(new { success = false, responseText = "Please upload .png and.jpg files !!" }, JsonRequestBehavior.AllowGet);
                    }
                    UploadFiles(obj.Image, obj.Id.ToString(), "Image", "");
                    HaveImage = 1;
                };
                if (obj.SEO_Slug == null)
                {
                    Slug = GenerateCatSlug(obj.Category_En);
                }
                ILMEntities d = new ILMEntities();
                var CatData = (from s in mc.GetAllCategory() where s.Id == obj.Id select s).FirstOrDefault();
                if (CatData != null)
                {
                    BsonDocument objDocument = new BsonDocument {
                            {"_id",CatData._id},
                            {"Id",obj.Id},
                            {"SerialNo",obj.SerialNo },
                            {"Category_En",obj.Category_En},
                            {"Category_Hi",obj.Category_Hi ?? ""},
                            {"Category_Ur",obj.Category_Ur ?? "" },
                            {"Descr_En",obj.Descr_En ?? "" },
                            {"Descr_Hi",obj.Descr_Hi ?? ""},
                            {"Descr_Ur",obj.Descr_Ur ?? ""},
                            {"IsActive",obj.IsActive ?? true },
                            {"DateCreated",CatData.DateCreated },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",CatData.CreatedBy },
                            {"ModifiedBy",obj.CreatedBy },
                            {"HaveImage",CatData.HaveImage },
                            {"ImageName",CatData.ImageName },
                            {"SEO_Slug",CatData.SEO_Slug }
                        };
                    mc.UpdateToDB(objDocument, obj.Id, "IlmCategory");
                }
                else
                {
                    var Rowcount = (from s in mc.GetAllCategory() orderby s.SerialNo descending select s.SerialNo).FirstOrDefault();
                    BsonDocument objDocument = new BsonDocument {
                            {"Id",obj.Id},
                            {"SerialNo",(Rowcount ?? 0)  + 1},
                            {"Category_En",obj.Category_En},
                            {"Category_Hi", obj.Category_Hi ?? ""},
                            {"Category_Ur",obj.Category_Ur ?? "" },
                            {"Descr_En",obj.Descr_En ?? ""},
                            {"Descr_Hi",obj.Descr_Hi ?? ""},
                            {"Descr_Ur",obj.Descr_Ur ?? ""},
                            {"IsActive",obj.IsActive ?? true },
                            {"DateCreated",DateTime.Now },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",obj.CreatedBy ?? Guid.Empty },
                            {"ModifiedBy",obj.CreatedBy ?? Guid.Empty },
                            {"HaveImage",HaveImage },
                            {"ImageName",obj.Id.ToString() + fileExt },
                            {"SEO_Slug",Slug }
                        };

                    mc.SaveToMongo(objDocument, "IlmCategory");
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, responseText = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true, responseText = "Record Saved Successfully !!" }, JsonRequestBehavior.AllowGet);
        }
        private string UploadFiles(HttpPostedFileBase File, string Id, string FileType, string FileSuffix)
        {
            string path = string.Empty;
            string FileName = string.Empty;
            if (FileType == "Image")
            {
                bool exists = System.IO.Directory.Exists(Server.MapPath("~/Image/"));
                if (!exists)
                    System.IO.Directory.CreateDirectory(Server.MapPath("~/Image/"));
                var fileExt = Path.GetExtension(File.FileName);
                path = Server.MapPath("~/Image/" + Id.ToString() + fileExt);
                FileName = Id.ToString() + fileExt;
            }
            else if (FileType == "Audio")
            {
                bool exists = System.IO.Directory.Exists(Server.MapPath("~/Audio/"));
                if (!exists)
                    System.IO.Directory.CreateDirectory(Server.MapPath("~/Audio/"));
                var fileExt = Path.GetExtension(File.FileName);
                path = Server.MapPath("~/Audio/" + Id.ToString() + "_" + FileSuffix + fileExt);
                FileName = Id.ToString() + "_" + FileSuffix + fileExt;
            }
            if (path != "")
                File.SaveAs(path);

            return FileName;
        }
        public ActionResult DeleteCategory(Guid Id)
        {
            try
            {
                ILMEntities d = new ILMEntities();
                var mc = new MongoConnector();
                var Data = (from s in mc.GetAllCategory() where s.Id == Id select s).FirstOrDefault();
                if (Data != null)
                {
                    var filePath = Server.MapPath("~/Image/" + Data.ImageName);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                    mc.DeleteFromDB(Id, "IlmCategory");
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, responseText = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
        public ActionResult ViewWord()
        {
            return View();
        }
        public ActionResult FillWordGrid()
        {
            ILMEntities d = new ILMEntities();
            var mc = new MongoConnector();

            var Word = (from s in mc.GetAllWord()
                        join c in mc.GetAllCategory()
                        on s.CatgeoryId equals c.Id
                        orderby s.SerialNo
                        select new
                        {
                            s.Id,
                            c.Category_En,
                            s.SerialNo,
                            s.Word_En,
                            s.Word_Hi,
                            s.Word_Ur,
                            s.Descr_En,
                            s.Descr_Hi,
                            s.Descr_Ur
                        }).ToList();
            return Json(Word, JsonRequestBehavior.AllowGet);
        }
        [AllowAnonymous]
        public ActionResult AddWord(Guid? Id)
        {
            var mc = new MongoConnector();
            ViewBag.Category = (from s in mc.GetAllCategory() where !s.Category_En.ToLower().Contains("quiz") orderby s.SerialNo select new { Text = s.Category_En, Value = s.Id }).ToList();
            ViewBag.WordRoots = (from s in mc.GetAllWordOrigin() select new { Text = s.Name_En, Value = s.Id }).ToList();
            if (Id != null)
            {
                ViewBag.Action = "Edit";
                var CatData = (from s in mc.GetAllWord() where s.Id == Id select s).FirstOrDefault();
                return View(CatData);
            }
            else
            {
                ViewBag.Action = "New";
                var Rowcount = (from s in mc.GetAllWord() orderby s.SerialNo descending select s.SerialNo).FirstOrDefault();
                IlmWordModel obj = new IlmWordModel();
                obj.Id = Guid.NewGuid();
                obj.SerialNo = (Rowcount ?? 0) + 1;
                return View(obj);
            }
        }
        [HttpPost]
        public ActionResult AddWord(IlmWordModel obj)
        {
            var mc = new MongoConnector();
            try
            {
                int HaveImage = 0;
                string fileExt = null, ImgfileExt = null;
                string Slug = string.Empty;
                string ImageName = "", SherAudioName = "", UsageSherAudioName = "", MoreSherAudioName = "", MoreOtherSherAudioName = "", WordAudioName = "";
                if (obj.Image != null)
                {
                    var fileName = obj.Image.FileName;
                    var FileLength = obj.Image.ContentLength;
                    ImgfileExt = Path.GetExtension(obj.Image.FileName);
                    if (FileLength / 1000 > 200)
                    {
                        return Json(new { success = false, responseText = "Please upload File Size less than 200kb !!" }, JsonRequestBehavior.AllowGet);

                    }
                    if (ImgfileExt.ToUpper() != ".PNG" && ImgfileExt.ToUpper() != ".JPG")
                    {
                        return Json(new { success = false, responseText = "Please upload .png and .jpg files !!" }, JsonRequestBehavior.AllowGet);
                    }
                    ImageName = UploadFiles(obj.Image, obj.Id.ToString(), "Image", "");
                    HaveImage = 1;
                };
                if (obj.SherAudioFile != null)
                {
                    fileExt = Path.GetExtension(obj.SherAudioFile.FileName);
                    if (fileExt.ToUpper() != ".MP3" && fileExt.ToUpper() != ".OGG")
                    {
                        return Json(new { success = false, responseText = "Please upload .mp3 and .ogg files in Sher Audio !!" }, JsonRequestBehavior.AllowGet);
                    }
                    SherAudioName = UploadFiles(obj.SherAudioFile, obj.Id.ToString(), "Audio", "Sher");
                }
                if (obj.UsgaeSherAudioFile != null)
                {
                    fileExt = Path.GetExtension(obj.UsgaeSherAudioFile.FileName);
                    if (fileExt.ToUpper() != ".MP3" && fileExt.ToUpper() != ".OGG")
                    {
                        return Json(new { success = false, responseText = "Please upload .mp3 and .ogg files in Usage Sher Audio !!" }, JsonRequestBehavior.AllowGet);
                    }
                    UsageSherAudioName = UploadFiles(obj.UsgaeSherAudioFile, obj.Id.ToString(), "Audio", "UsageSher");
                }
                if (obj.MoreSherAudioFile != null)
                {
                    fileExt = Path.GetExtension(obj.MoreSherAudioFile.FileName);
                    if (fileExt.ToUpper() != ".MP3" && fileExt.ToUpper() != ".OGG")
                    {
                        return Json(new { success = false, responseText = "Please upload .mp3 and .ogg files in More Sher Audio !!" }, JsonRequestBehavior.AllowGet);
                    }
                    MoreSherAudioName = UploadFiles(obj.MoreSherAudioFile, obj.Id.ToString(), "Audio", "MoreSher");
                }
                if (obj.MoreSherOtherAudioFile != null)
                {
                    fileExt = Path.GetExtension(obj.MoreSherOtherAudioFile.FileName);
                    if (fileExt.ToUpper() != ".MP3" && fileExt.ToUpper() != ".OGG")
                    {
                        return Json(new { success = false, responseText = "Please upload .mp3 and .ogg files in More other Sher Audio !!" }, JsonRequestBehavior.AllowGet);
                    }
                    MoreOtherSherAudioName = UploadFiles(obj.MoreSherOtherAudioFile, obj.Id.ToString(), "Audio", "MoreOtherSher");
                }
                if (obj.WordAudioFile != null)
                {
                    fileExt = Path.GetExtension(obj.WordAudioFile.FileName);
                    if (fileExt.ToUpper() != ".MP3" && fileExt.ToUpper() != ".OGG")
                    {
                        return Json(new { success = false, responseText = "Please upload .mp3 and .ogg files in Word Audio !!" }, JsonRequestBehavior.AllowGet);
                    }
                    WordAudioName = UploadFiles(obj.WordAudioFile, obj.Id.ToString(), "Audio", "WordAudio");
                }
                if (obj.SEO_Slug == null)
                {
                    Slug = GenerateWordSlug(obj.Word_En, obj.CatgeoryId);
                }
                ILMEntities d = new ILMEntities();
                var Word = mc.GetAllWord();
                var WordData = (from s in Word where s.Id == obj.Id select s).FirstOrDefault();
                if (WordData != null)
                {
                    if (obj.SherAudio == null)
                    {
                        obj.SherAudio = WordData.SherAudio;
                    }
                    if (obj.UsageSherAudio == null)
                    {
                        obj.UsageSherAudio = WordData.UsageSherAudio;
                    }
                    if (obj.MoreSherAudio == null)
                    {
                        obj.MoreSherAudio = WordData.MoreSherAudio;
                    }
                    if (obj.MoreSherOtherAudio == null)
                    {
                        obj.MoreSherOtherAudio = WordData.MoreSherOtherAudio;
                    }
                    if (obj.WordAudio == null && WordData.WordAudio == null)
                    {
                        obj.WordAudio = WordAudioName;
                    }
                    else
                    {
                        obj.WordAudio = WordData.WordAudio;
                    }
                    if(obj.SEO_Slug != null)
                    {
                        Slug = obj.SEO_Slug;
                    }
                    BsonDocument objDocument = new BsonDocument {
                            {"_id",WordData._id},
                            {"Id",obj.Id},
                            {"SerialNo",obj.SerialNo},
                            {"CatgeoryId",obj.CatgeoryId },
                            {"Word_En",obj.Word_En},
                            {"Word_Hi",obj.Word_Hi ?? ""},
                            {"Word_Ur",obj.Word_Ur ?? "" },
                            {"Descr_En",obj.Descr_En },
                            {"Descr_Hi",obj.Descr_Hi ?? ""},
                            {"Descr_Ur",obj.Descr_Ur ?? ""},

                            {"Sher", obj.Sher ?? Guid.Empty},
                            {"SherExplanation_En", obj.SherExplanation_En },
                            {"SherExplanation_Hi", obj.SherExplanation_Hi ?? "" },
                            {"SherExplanation_Ur", obj.SherExplanation_Ur ?? "" },
                            {"SherTranslation_En", obj.SherTranslation_En },
                            {"SherTranslation_Hi", obj.SherTranslation_Hi ?? "" },
                            {"SherTranslation_Ur", obj.SherTranslation_Ur ?? "" },
                            { "SherAudio",obj.SherAudio},

                            {"UsageSher", obj.UsageSher ?? Guid.Empty},
                            {"UsageSherExplanation_En", obj.UsageSherExplanation_En },
                            {"UsageSherExplanation_Hi", obj.UsageSherExplanation_Hi ?? "" },
                            {"UsageSherExplanation_Ur", obj.UsageSherExplanation_Ur ?? "" },
                            {"UsageSherTranslation_En", obj.UsageSherTranslation_En },
                            {"UsageSherTranslation_Hi", obj.UsageSherTranslation_Hi ?? "" },
                            {"UsageSherTranslation_Ur", obj.UsageSherTranslation_Ur ?? "" },
                            { "UsageSherAudio",obj.UsageSherAudio},

                            {"MoreSher", obj.MoreSher ?? Guid.Empty},
                            {"MoreSherExplanation_En", obj.MoreSherExplanation_En },
                            {"MoreSherExplanation_Hi", obj.MoreSherExplanation_Hi ?? "" },
                            {"MoreSherExplanation_Ur", obj.MoreSherExplanation_Ur ?? "" },
                            {"MoreSherTranslation_En", obj.MoreSherTranslation_En },
                            {"MoreSherTranslation_Hi", obj.MoreSherTranslation_Hi ?? "" },
                            {"MoreSherTranslation_Ur", obj.MoreSherTranslation_Ur ?? "" },
                            { "MoreSherAudio",obj.MoreSherAudio},

                            {"MoreSherOther", obj.MoreSherOther ?? Guid.Empty},
                            {"MoreSherOtherExplanation_En", obj.MoreSherOtherExplanation_En },
                            {"MoreSherOtherExplanation_Hi", obj.MoreSherOtherExplanation_Hi ?? "" },
                            {"MoreSherOtherExplanation_Ur", obj.MoreSherOtherExplanation_Ur ?? "" },
                            {"MoreSherOtherTranslation_En", obj.MoreSherOtherTranslation_En },
                            {"MoreSherOtherTranslation_Hi", obj.MoreSherOtherTranslation_Hi ?? "" },
                            {"MoreSherOtherTranslation_Ur", obj.MoreSherOtherTranslation_Ur ?? "" },
                            { "MoreSherOtherAudio",obj.MoreSherOtherAudio},

                            { "PartOfSpeech",obj.PartOfSpeech },
                            {"WordType",obj.WordType },
                            {"WordRoots",obj.WordRoots },
                            {"WordSynonyms",obj.WordSynonyms },
                            {"HaveImage",WordData.HaveImage },
                            {"IsActive",obj.IsActive },
                            {"ImageName", WordData.ImageName},
                            {"DateCreated",WordData.DateCreated },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",WordData.CreatedBy ?? Guid.Empty },
                            {"ModifiedBy",obj.CreatedBy ?? Guid.Empty },
                            {"WordAudio",obj.WordAudio },

                            {"QuizOptionOne_En",obj.QuizOptionOne_En},
                            {"QuizOptionOne_Hi",obj.QuizOptionOne_Hi},
                            {"QuizOptionTwo_En",obj.QuizOptionTwo_En },
                            {"QuizOptionTwo_Hi",obj.QuizOptionTwo_Hi},
                            {"IsCorrect",obj.IsCorrect},
                            {"SEO_Slug",Slug }


                        };
                    mc.UpdateToDB(objDocument, obj.Id, "IlmWord");
                }
                else
                {
                    var Rowcount = (from s in Word orderby s.SerialNo descending select s.SerialNo).FirstOrDefault();

                    BsonDocument objDocument = new BsonDocument {
                            {"Id",obj.Id},
                            {"SerialNo",(Rowcount ??0)  + 1},
                            {"CatgeoryId",obj.CatgeoryId },
                            {"Word_En",obj.Word_En},
                            {"Word_Hi",obj.Word_Hi ?? ""},
                            {"Word_Ur",obj.Word_Ur ?? "" },
                            {"Descr_En",obj.Descr_En },
                            {"Descr_Hi",obj.Descr_Hi ?? ""},
                            {"Descr_Ur",obj.Descr_Ur ?? ""},

                            {"Sher", obj.Sher ?? Guid.Empty},
                            {"SherExplanation_En", obj.SherExplanation_En },
                            {"SherExplanation_Hi", obj.SherExplanation_Hi ?? "" },
                            {"SherExplanation_Ur", obj.SherExplanation_Ur ?? "" },
                            {"SherTranslation_En", obj.SherTranslation_En },
                            {"SherTranslation_Hi", obj.SherTranslation_Hi ?? "" },
                            {"SherTranslation_Ur", obj.SherTranslation_Ur ?? "" },
                            { "SherAudio",SherAudioName},

                            {"UsageSher", obj.UsageSher ?? Guid.Empty},
                            {"UsageSherExplanation_En", obj.UsageSherExplanation_En },
                            {"UsageSherExplanation_Hi", obj.UsageSherExplanation_Hi ?? "" },
                            {"UsageSherExplanation_Ur", obj.UsageSherExplanation_Ur ?? "" },
                            {"UsageSherTranslation_En", obj.UsageSherTranslation_En },
                            {"UsageSherTranslation_Hi", obj.UsageSherTranslation_Hi ?? "" },
                            {"UsageSherTranslation_Ur", obj.UsageSherTranslation_Ur ?? "" },
                            { "UsageSherAudio",UsageSherAudioName},

                            {"MoreSher", obj.MoreSher ?? Guid.Empty},
                            {"MoreSherExplanation_En", obj.MoreSherExplanation_En },
                            {"MoreSherExplanation_Hi", obj.MoreSherExplanation_Hi ?? "" },
                            {"MoreSherExplanation_Ur", obj.MoreSherExplanation_Ur ?? "" },
                            {"MoreSherTranslation_En", obj.MoreSherTranslation_En },
                            {"MoreSherTranslation_Hi", obj.MoreSherTranslation_Hi ?? "" },
                            {"MoreSherTranslation_Ur", obj.MoreSherTranslation_Ur ?? "" },
                            { "MoreSherAudio",MoreSherAudioName},

                            {"MoreSherOther", obj.MoreSherOther ?? Guid.Empty},
                            {"MoreSherOtherExplanation_En", obj.MoreSherOtherExplanation_En },
                            {"MoreSherOtherExplanation_Hi", obj.MoreSherOtherExplanation_Hi ?? "" },
                            {"MoreSherOtherExplanation_Ur", obj.MoreSherOtherExplanation_Ur ?? "" },
                            {"MoreSherOtherTranslation_En", obj.MoreSherOtherTranslation_En },
                            {"MoreSherOtherTranslation_Hi", obj.MoreSherOtherTranslation_Hi ?? "" },
                            {"MoreSherOtherTranslation_Ur", obj.MoreSherOtherTranslation_Ur ?? "" },
                            { "MoreSherOtherAudio",MoreOtherSherAudioName},

                            { "PartOfSpeech",obj.PartOfSpeech },
                            {"WordType",obj.WordType },
                            {"WordRoots",obj.WordRoots },
                            {"WordSynonyms",obj.WordSynonyms },
                            {"HaveImage",HaveImage },
                            {"IsActive",true },
                            {"ImageName", obj.Id.ToString() + ImgfileExt},
                            {"DateCreated",DateTime.Now },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",obj.CreatedBy ?? Guid.Empty },
                            {"ModifiedBy",obj.CreatedBy ?? Guid.Empty },
                            {"WordAudio",WordAudioName },

                            {"QuizOptionOne_En",obj.QuizOptionOne_En},
                            {"QuizOptionOne_Hi",obj.QuizOptionOne_Hi},
                            {"QuizOptionTwo_En",obj.QuizOptionTwo_En },
                            {"QuizOptionTwo_Hi",obj.QuizOptionTwo_Hi},
                            {"IsCorrect",obj.IsCorrect},
                            {"SEO_Slug",Slug }
                        };

                    mc.SaveToMongo(objDocument, "IlmWord");

                };
            }
            catch (Exception ex)
            {
                return Json(new { success = false, responseText = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true, responseText = "Record Saved Successfully !!" }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult FIllSher(string Filtertxt)
        {
            ILMEntities d = new ILMEntities();
            var SherList = (from s in d.Contents where s.Content_En.Contains(Filtertxt) select new { Id = s.Id, Content = s.Content_En, selected = false }).Take(1000).ToList();
            return Json(SherList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteWord(Guid Id)
        {
            ILMEntities d = new ILMEntities();
            var mc = new MongoConnector();
            var Data = (from s in mc.GetAllWord() where s.Id == Id select s).FirstOrDefault();
            string filePath = string.Empty;
            if (Data != null)
            {
                filePath = Server.MapPath("~/Image/" + Data.ImageName);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                filePath = Server.MapPath("~/Audio/" + Data.SherAudio);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                filePath = Server.MapPath("~/Audio/" + Data.UsageSherAudio);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                filePath = Server.MapPath("~/Audio/" + Data.MoreSherAudio);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                filePath = Server.MapPath("~/Audio/" + Data.MoreSherOtherAudio);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                filePath = Server.MapPath("~/Audio/" + Data.WordAudio);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                mc.DeleteFromDB(Id, "IlmWord");
            }
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
        public ActionResult ViewWordOrigin()
        {
            return View();
        }
        public JsonResult FillWordOrigin()
        {
            ILMEntities d = new ILMEntities();
            var mc = new MongoConnector();
            var Origin = (from s in mc.GetAllWordOrigin()
                          orderby s.Name_En
                          select new
                          {
                              s.Id,
                              s.Name_En,
                              s.Name_Hi,
                              s.Name_Ur,
                              s.IsActive
                          }).ToList();
            return Json(Origin, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddWordOrigin(Guid? Id)
        {
            //ILMEntities d = new ILMEntities();
            var mc = new MongoConnector();
            if (Id != null)
            {
                var Origin = (from s in mc.GetAllWordOrigin() where s.Id == Id select s).FirstOrDefault();
                return View(Origin);
            }
            else
            {
                IlmWordOriginModel obj = new IlmWordOriginModel();
                obj.Id = Guid.NewGuid();
                obj.IsActive = true;
                return View(obj);
            }
        }
        [HttpPost]
        public ActionResult AddWordOrigin(IlmWordOriginModel obj)
        {
            var mc = new MongoConnector();
            string Slug = string.Empty;
            try
            {
                if (obj.SEO_Slug == null)
                {
                    Slug = GenerateOriginSlug(obj.Name_En);
                }
                var OrgData = (from s in mc.GetAllWordOrigin() where s.Id == obj.Id select s).FirstOrDefault();
                if (OrgData != null)
                {
                    BsonDocument objDocument = new BsonDocument {
                            {"_id",OrgData._id },
                            {"Id",obj.Id},
                            {"Name_En",obj.Name_En},
                            {"Name_Hi", obj.Name_Hi ?? ""},
                            {"Name_Ur",obj.Name_Ur ?? "" },
                            {"IsActive",obj.IsActive ?? true },
                            {"DateCreated",OrgData.DateCreated },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",OrgData.CreatedBy ?? Guid.Empty },
                            {"ModifiedBy",obj.CreatedBy ?? Guid.Empty },
                            {"SEO_Slug",OrgData.SEO_Slug }
                        };

                    mc.UpdateToDB(objDocument, obj.Id, "IlmWordOrigin");
                }
                else
                {
                    BsonDocument objDocument = new BsonDocument {
                            {"Id",obj.Id},
                            {"Name_En",obj.Name_En},
                            {"Name_Hi", obj.Name_Hi ?? ""},
                            {"Name_Ur",obj.Name_Ur ?? "" },
                            {"IsActive",obj.IsActive ?? true },
                            {"DateCreated",DateTime.Now },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",obj.CreatedBy ?? Guid.Empty },
                            {"ModifiedBy",obj.CreatedBy ?? Guid.Empty },
                            {"SEO_Slug",Slug }
                        };

                    mc.SaveToMongo(objDocument, "IlmWordOrigin");
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, responseText = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true, responseText = "Record Saved Successfully !!" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteWordOrigin(Guid Id)
        {
            var mc = new MongoConnector();
            var Data = (from s in mc.GetAllWordOrigin() where s.Id == Id select s).FirstOrDefault();
            if (Data != null)
            {
                mc.DeleteFromDB(Id, "IlmWordOrigin");
            }
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
        public ActionResult ViewUserBadges()
        {
            return View();
        }
        public ActionResult FillUserBadges()
        {
            var mc = new MongoConnector();
            var Badges = (from s in mc.GetAllUserBadges()
                          orderby s.SerialNo
                          select new
                          {
                              s.Id,
                              s.SerialNo,
                              s.Descr_En,
                              s.Descr_Hi,
                              s.Descr_Ur,
                              s.IsActive,
                              s.HaveImage,
                              s.ImageName
                          }).ToList();
            return Json(Badges, JsonRequestBehavior.AllowGet);
        }
        [AllowAnonymous]
        public ActionResult AddUserBadges(Guid? Id)
        {
            var mc = new MongoConnector();
            if (Id != null)
            {
                ViewBag.Action = "Edit";
                var CData = (from s in mc.GetAllUserBadges() where s.Id == Id select s).FirstOrDefault();
                return View(CData);
            }
            else
            {
                ViewBag.Action = "New";
                var Rowcount = (from s in mc.GetAllUserBadges() orderby s.SerialNo descending select s.SerialNo).FirstOrDefault();
                IlmUserBadgesModel obj = new IlmUserBadgesModel();
                obj.Id = Guid.NewGuid();
                obj.IsActive = true;
                obj.SerialNo = (Rowcount ?? 0) + 1;
                return View(obj);
            }
        }
        [HttpPost]
        public ActionResult AddUserBadges(IlmUserBadgesModel obj)
        {
            var mc = new MongoConnector();
            try
            {
                int HaveImage = 0;
                string fileExt = null;
                string ImageSaveName = string.Empty;
                string Slug = string.Empty;
                if (obj.Image != null)
                {
                    var fileName = obj.Image.FileName;
                    var FileLength = obj.Image.ContentLength;
                    fileExt = Path.GetExtension(obj.Image.FileName);

                    if (FileLength / 1000 > 200)
                    {
                        return Json(new { success = false, responseText = "Please upload File Size less than 200kb !!" }, JsonRequestBehavior.AllowGet);

                    }
                    if (fileExt.ToUpper() != ".PNG" && fileExt.ToUpper() != ".JPG")
                    {
                        return Json(new { success = false, responseText = "Please upload .png and.jpg files !!" }, JsonRequestBehavior.AllowGet);
                    }
                    ImageSaveName = UploadFiles(obj.Image, obj.Id.ToString(), "Image", "");
                    HaveImage = 1;
                };
                if (obj.SEO_Slug == null)
                {
                    Slug = GenerateBadgesSlug(obj.Descr_En);
                }
                var CData = (from s in mc.GetAllUserBadges() where s.Id == obj.Id select s).FirstOrDefault();
                if (CData != null)
                {
                    BsonDocument objDocument = new BsonDocument {
                            {"_id",CData._id},
                            {"Id",obj.Id},
                            {"SerialNo",obj.SerialNo},
                            {"Descr_En",obj.Descr_En},
                            {"Descr_Hi", obj.Descr_Hi ?? ""},
                            {"Descr_Ur",obj.Descr_Ur ?? "" },
                            {"IsActive",obj.IsActive ?? true },
                            {"DateCreated",CData.DateCreated },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",CData.CreatedBy ?? Guid.Empty },
                            {"ModifiedBy",obj.CreatedBy ?? Guid.Empty },
                            {"HaveImage",CData.HaveImage },
                            {"ImageName",CData.ImageName },
                            {"SEO_Slug",CData.SEO_Slug}
                        };

                    mc.UpdateToDB(objDocument, obj.Id, "IlmUserBadges");
                }
                else
                {
                    var Rowcount = (from s in mc.GetAllUserBadges() orderby s.SerialNo descending select s.SerialNo).FirstOrDefault();

                    BsonDocument objDocument = new BsonDocument {
                            {"Id",obj.Id},
                            {"SerialNo",(Rowcount ?? 0) + 1},
                            {"Descr_En",obj.Descr_En},
                            {"Descr_Hi", obj.Descr_Hi ?? ""},
                            {"Descr_Ur",obj.Descr_Ur ?? "" },
                            {"IsActive",obj.IsActive ?? true },
                            {"DateCreated",DateTime.Now },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",obj.CreatedBy ?? Guid.Empty },
                            {"ModifiedBy",obj.CreatedBy ?? Guid.Empty },
                            {"HaveImage",HaveImage },
                            {"ImageName",ImageSaveName },
                            {"SEO_Slug",Slug}
                        };

                    mc.SaveToMongo(objDocument, "IlmUserBadges");
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, responseText = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true, responseText = "Record Saved Successfully !!" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteUserBadges(Guid Id)
        {
            var mc = new MongoConnector();
            var Data = (from s in mc.GetAllUserBadges() where s.Id == Id select s).FirstOrDefault();
            if (Data != null)
            {
                var filePath = Server.MapPath("~/Image/" + Data.ImageName);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                mc.DeleteFromDB(Id, "IlmUserBadges");
            }
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
        public ActionResult SiteConfig()
        {
            var mc = new MongoConnector();
            var Config = (from s in mc.GetAllSiteConfig() select s).FirstOrDefault();
            if (Config == null)
            {
                IlmSiteConfigModel obj = new IlmSiteConfigModel();
                obj.Id = Guid.NewGuid();
                obj.IsActive = true;
                return View(obj);
            }
            else
            {
                return View(Config);
            }
        }
        [HttpPost]
        public ActionResult SiteConfig(IlmSiteConfigModel obj)
        {
            try
            {
                var mc = new MongoConnector();
                var Config = (from s in mc.GetAllSiteConfig() where s.Id == obj.Id select s).FirstOrDefault();
                if (Config != null)
                {
                    BsonDocument objDocument = new BsonDocument {
                            {"_id",Config._id},
                            {"Id",obj.Id},
                            {"DailyGoal",obj.DailyGoal},
                            {"CorrectAnsMarks",obj.CorrectAnsMarks},
                            {"WrongAnsMarks", obj.WrongAnsMarks},
                            {"WordCompleted",obj.WordCompleted},
                            {"CategoryCompleted",obj.CategoryCompleted},//SevenDaysStreak
                            {"SevenDaysStreak",obj.SevenDaysStreak},
                            {"QuizOptions",obj.QuizOptions},
                            {"IsActive",obj.IsActive ?? true },
                            {"DateCreated",Config.DateCreated },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",Config.CreatedBy ?? Guid.Empty },
                            {"ModifiedBy",obj.CreatedBy ?? Guid.Empty }
                        };

                    mc.UpdateToDB(objDocument, obj.Id, "IlmSiteConfig");
                }
                else
                {
                    BsonDocument objDocument = new BsonDocument {
                            {"Id",obj.Id},
                            {"DailyGoal",obj.DailyGoal},
                            {"CorrectAnsMarks",obj.CorrectAnsMarks},
                            {"WrongAnsMarks", obj.WrongAnsMarks},
                            {"WordCompleted",obj.WordCompleted},
                            {"CategoryCompleted",obj.CategoryCompleted},
                            {"SevenDaysStreak",obj.SevenDaysStreak},
                            {"QuizOptions",obj.QuizOptions},
                            {"IsActive",obj.IsActive ?? true },
                            {"DateCreated",DateTime.Now },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",obj.CreatedBy ?? Guid.Empty },
                            {"ModifiedBy",obj.CreatedBy ?? Guid.Empty }
                        };

                    mc.SaveToMongo(objDocument, "IlmSiteConfig");
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, responseText = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true, responseText = "Record Saved Successfully !!" }, JsonRequestBehavior.AllowGet);
        }

        private string GenerateCatSlug(string Category)
        {
            string Slug = string.Empty;
            var mc = new MongoConnector();
            var Catdata = mc.GetAllCategory();
            Slug = Category.Replace(' ', '-');
            var CatAvailCount = Catdata.Where(s => s.SEO_Slug.Contains(Slug)).Count();
            Slug = Slug + (Convert.ToString(CatAvailCount) == "0" ? "" : Convert.ToString(CatAvailCount));
            return Slug.Trim();
        }
        private string GenerateWordSlug(string Word, Guid CatId)
        {
            string Slug = string.Empty;
            var mc = new MongoConnector();
            var Category = (from s in mc.GetAllCategory() where s.Id == CatId select s.Category_En).FirstOrDefault();
            Slug = Category.Replace(' ', '-') + "-" + Word.Replace(' ', '-');
            var SlugCount = mc.GetAllWord().Where(s => s.SEO_Slug.Contains(Slug)).Count();
            Slug = Slug + (Convert.ToString(SlugCount) == "0" ? "" : Convert.ToString(SlugCount));
            return Slug.Trim();
        }
        private string GenerateOriginSlug(string Origin)
        {
            string Slug = string.Empty;
            var mc = new MongoConnector();
            var Orgdata = mc.GetAllWordOrigin();
            Slug = Origin.Replace(' ', '-');
            var OrgAvailCount = Orgdata.Where(s => s.SEO_Slug.Contains(Slug)).Count();
            Slug = Slug + (Convert.ToString(OrgAvailCount) == "0" ? "" : Convert.ToString(OrgAvailCount));
            return Slug.Trim();
        }
        private string GenerateBadgesSlug(string Badges)
        {
            string Slug = string.Empty;
            var mc = new MongoConnector();
            var Badgesdata = mc.GetAllUserBadges();
            Slug = Badges.Replace(' ', '-');
            //var Count = Badgesdata.Where(s => s.SEO_Slug.Contains(Slug)).Count();
            //Slug = Slug + (Convert.ToString(Count) == "0" ? "" : Convert.ToString(Count));
            return Slug.Trim();
        }

        public ActionResult Quiz()
        {
            return View();
        }
        public ActionResult QuizEditor(Guid? Id)
        {
            var mc = new MongoConnector();
            ViewBag.Category = (from s in mc.GetAllCategory() where !s.Category_En.ToLower().Contains("quiz") orderby s.SerialNo select new { Text = s.Category_En, Value = s.Id }).ToList();
            ViewBag.Word = (from s in mc.GetAllWord() select new { Text = s.Word_En, Value = s.Id }).ToList();
            ViewBag.OptionCount = (from s in mc.GetAllSiteConfig() select s.QuizOptions).FirstOrDefault();
            if (Id != null)
            {
                ViewBag.Action = "Edit";
                var CData = (from s in mc.GetQuiz() where s.Id == Id select s).FirstOrDefault();
                return View(CData);
            }
            else
            {
                ViewBag.Action = "New";
                ILMQuestionMasterModel obj = new ILMQuestionMasterModel();
                var QuestionId = Guid.NewGuid();
                obj.Id = QuestionId;
                obj.IsActive = true;
                var Options = new ILMQuestionOptionModel
                {
                    QuestionId = QuestionId,
                    Option_En = "",
                    Option_Hi = "",
                    IsCorrect = false,
                    IsActive = true
                };
                obj.QuestionOptions.Add(Options);
                return View(obj);
            }
        }
        [HttpPost]
        public ActionResult QuizEditor(ILMQuestionMasterModel obj)
        {
            try
            {
                var mc = new MongoConnector();
                var Quiz = mc.GetQuiz();
                var Quizdata = (from s in Quiz where s.Id == obj.Id select s).FirstOrDefault();
                if (Quizdata != null)
                {
                    BsonArray br = new BsonArray();
                    for (int i = 0; i < obj.QuestionOptions.Count(); i++)
                    {
                        BsonDocument objOptions = new BsonDocument{
                            {"Id",obj.QuestionOptions[i].Id},
                            {"QuestionId",obj.Id},
                            {"Option_En",obj.QuestionOptions[i].Option_En},
                            {"Option_Hi", obj.QuestionOptions[i].Option_Hi},
                            {"IsActive",obj.QuestionOptions[i].IsActive },
                            {"IsCorrect",obj.QuestionOptions[i].IsCorrect }
                        };
                        br.Add(objOptions);
                    }

                    BsonDocument objDocument = new BsonDocument {
                            {"Id",obj.Id},
                            {"CategoryId",obj.CategoryId},
                            {"WordId",obj.WordId},
                            {"Desc_En", obj.Desc_En ?? ""},
                            {"QuestionOptions", br},
                            {"IsActive",obj.IsActive },
                            {"DateCreated",Quizdata.DateCreated },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",Quizdata.CreatedBy },
                            {"ModifiedBy",obj.CreatedBy }
                        };
                    mc.UpdateToDB(objDocument, obj.Id, "IlmQuestionMaster");
                }
                else
                {
                    BsonArray br = new BsonArray();
                    for (int i = 0; i < obj.QuestionOptions.Count(); i++)
                    {
                        BsonDocument objOptions = new BsonDocument{
                            {"Id",Guid.NewGuid()},
                            {"QuestionId",obj.Id},
                            {"Option_En",obj.QuestionOptions[i].Option_En},
                            {"Option_Hi", obj.QuestionOptions[i].Option_Hi},
                            {"IsActive",obj.QuestionOptions[i].IsActive },
                            {"IsCorrect",obj.QuestionOptions[i].IsCorrect }
                        };
                        br.Add(objOptions);
                    }
                    BsonDocument objDocument = new BsonDocument {
                            {"Id",obj.Id},
                            {"CategoryId",obj.CategoryId},
                            {"WordId",obj.WordId},
                            {"Desc_En", obj.Desc_En ?? ""},
                            {"QuestionOptions", br},
                            {"IsActive",obj.IsActive },
                            {"DateCreated",DateTime.Now },
                            {"DateModified",DateTime.Now },
                            {"CreatedBy",obj.CreatedBy },
                            {"ModifiedBy",obj.CreatedBy }
                        };
                    mc.SaveToMongo(objDocument, "IlmQuestionMaster");
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, responseText = ex.ToString() }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = true, responseText = "Record Saved Successfully !!" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult FillQuiz()
        {
            var mc = new MongoConnector();
            var Category = mc.GetAllCategory();
            var Word = mc.GetAllWord();
            var Quiz = (from s in mc.GetQuiz()
                        join c in Category on s.CategoryId equals c.Id
                        join w in Word on s.WordId equals w.Id
                        select new
                        {
                            s.Id,
                            s.Desc_En,
                            c.Category_En,
                            w.Word_En,
                            s.IsActive
                        }).ToList();
            return Json(Quiz, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddQuizQuestion(Guid? Id)
        {
            return View();
        }
        public ActionResult DeleteQuiz(Guid Id)
        {
            var mc = new MongoConnector();
            var Options = (from s in mc.GetQuizOptions() where s.QuestionId == Id select s).FirstOrDefault();
            if (Options != null)
            {
                mc.DeleteQuestionOptionsDB(Id, "IlmQuestionOption");
            }
            var Question = (from s in mc.GetQuiz() where s.Id == Id select s).FirstOrDefault();
            if (Question != null)
            {
                mc.DeleteFromDB(Id, "IlmQuestionMaster");
            }
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
    }

}
