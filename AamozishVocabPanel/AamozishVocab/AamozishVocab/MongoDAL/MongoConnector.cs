using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;
using AamozishVocab.Models;

namespace AamozishVocab.MongoDAL
{
    public class MongoConnector
    {
        public static readonly string mdbConnectionString = System.Configuration.ConfigurationManager.AppSettings["MongoConnection"].ToString();
        public static readonly string mdbAV = "Aamozish";
        MongoClient _pClient;
        IMongoDatabase _trackerDatabase;
        public MongoConnector()
        {
            _pClient = new MongoClient(mdbConnectionString);
            _trackerDatabase = _pClient.GetDatabase(mdbAV);
        }
        public bool SaveToMongo(BsonDocument Obj, string CollName)
        {
            try
            {
                var ObjSave = _trackerDatabase.GetCollection<BsonDocument>(CollName);
                ObjSave.InsertOneAsync(Obj);
            }
            catch
            {
            }
            return true;
        }
        public void DeleteFromDB(Guid Id, string CollName)
        {
            var collection = _trackerDatabase.GetCollection<BsonDocument>(CollName);
            var deleteFilter = Builders<BsonDocument>.Filter.Eq("Id", Id);
            collection.DeleteOne(deleteFilter);
        }
        public void DeleteQuestionOptionsDB(Guid Id, string CollName)
        {
            var collection = _trackerDatabase.GetCollection<BsonDocument>(CollName);
            var deleteFilter = Builders<BsonDocument>.Filter.Eq("QuestionId", Id);
            collection.DeleteOne(deleteFilter);
        }
        public void UpdateToDB(BsonDocument objDocument, Guid objId, string CollName)
        {
            var collection = _trackerDatabase.GetCollection<BsonDocument>(CollName);
            var filter = Builders<BsonDocument>.Filter.Eq("Id", objId);
            collection.FindOneAndReplace(filter, objDocument);
        }
        public List<IlmCategoryModel> GetAllCategory()
        {
            var CatData = _trackerDatabase.GetCollection<IlmCategoryModel>("IlmCategory").Find(e => e.IsActive == true).ToList();

            return (from s in CatData
                    select new IlmCategoryModel
                    {
                        _id = s._id,
                        Id = s.Id,
                        SerialNo = s.SerialNo,
                        Category_En = s.Category_En,
                        Category_Hi = s.Category_Hi,
                        Category_Ur = s.Category_Ur,
                        Descr_En = s.Descr_En,
                        Descr_Hi = s.Descr_Hi,
                        Descr_Ur = s.Descr_Ur,
                        HaveImage = s.HaveImage,
                        IsActive = s.IsActive,
                        ImageName = s.ImageName,
                        DateCreated = s.DateCreated,
                        DateModified = s.DateModified,
                        CreatedBy = s.CreatedBy,
                        ModifiedBy = s.ModifiedBy,
                        SEO_Slug = s.SEO_Slug
                    }).ToList();
        }

        public List<IlmWordModel> GetAllWord()
        {
            var WordData = _trackerDatabase.GetCollection<IlmWordModel>("IlmWord").Find(e => e.IsActive == true).ToList();

            return (from s in WordData
                    select new IlmWordModel
                    {
                        _id = s._id,
                        Id = s.Id,
                        CatgeoryId = s.CatgeoryId,
                        SerialNo = s.SerialNo,
                        Word_En = s.Word_En,
                        Word_Hi = s.Word_Hi,
                        Word_Ur = s.Word_Ur,
                        Descr_En = s.Descr_En,
                        Descr_Hi = s.Descr_Hi,
                        Descr_Ur = s.Descr_Ur,

                        Sher = s.Sher,
                        SherExplanation_En = s.SherExplanation_En,
                        SherExplanation_Hi = s.SherExplanation_Hi,
                        SherExplanation_Ur = s.SherExplanation_Ur,
                        SherTranslation_En = s.SherTranslation_En,
                        SherTranslation_Hi = s.SherTranslation_Hi,
                        SherTranslation_Ur = s.SherTranslation_Ur,
                        SherAudio = s.SherAudio,

                        UsageSher = s.UsageSher,
                        UsageSherExplanation_En = s.UsageSherExplanation_En,
                        UsageSherExplanation_Hi = s.UsageSherExplanation_Hi,
                        UsageSherExplanation_Ur = s.UsageSherExplanation_Ur,
                        UsageSherTranslation_En = s.UsageSherTranslation_En,
                        UsageSherTranslation_Hi = s.UsageSherTranslation_Hi,
                        UsageSherTranslation_Ur = s.UsageSherTranslation_Ur,
                        UsageSherAudio = s.UsageSherAudio,

                        MoreSher = s.MoreSher,
                        MoreSherExplanation_En = s.MoreSherExplanation_En,
                        MoreSherExplanation_Hi = s.MoreSherExplanation_Hi,
                        MoreSherExplanation_Ur = s.MoreSherExplanation_Ur,
                        MoreSherTranslation_En = s.MoreSherTranslation_En,
                        MoreSherTranslation_Hi = s.MoreSherTranslation_Hi,
                        MoreSherTranslation_Ur = s.MoreSherTranslation_Ur,
                        MoreSherAudio = s.MoreSherAudio,

                        MoreSherOther = s.MoreSherOther,
                        MoreSherOtherExplanation_En = s.MoreSherOtherExplanation_En,
                        MoreSherOtherExplanation_Hi = s.MoreSherOtherExplanation_Hi,
                        MoreSherOtherExplanation_Ur = s.MoreSherOtherExplanation_Ur,
                        MoreSherOtherTranslation_En = s.MoreSherOtherTranslation_En,
                        MoreSherOtherTranslation_Hi = s.MoreSherOtherTranslation_Hi,
                        MoreSherOtherTranslation_Ur = s.MoreSherOtherTranslation_Ur,
                        MoreSherOtherAudio = s.MoreSherOtherAudio,

                        PartOfSpeech = s.PartOfSpeech,
                        WordType = s.WordType,
                        WordRoots = s.WordRoots,
                        WordSynonyms = s.WordSynonyms,
                        HaveImage = s.HaveImage,
                        IsActive = s.IsActive,
                        ImageName = s.ImageName,
                        CreatedBy = s.CreatedBy,
                        ModifiedBy = s.ModifiedBy,
                        DateCreated = s.DateCreated,
                        DateModified = s.DateModified,
                        WordAudio = s.WordAudio,

                        QuizOptionOne_En = s.QuizOptionOne_En,
                        QuizOptionOne_Hi = s.QuizOptionOne_Hi,
                        QuizOptionTwo_En = s.QuizOptionTwo_En,
                        QuizOptionTwo_Hi = s.QuizOptionTwo_Hi,
                        IsCorrect = s.IsCorrect,
                        SEO_Slug = s.SEO_Slug
                    }).ToList();
        }

        public List<IlmWordOriginModel> GetAllWordOrigin()
        {
            var OrgData = _trackerDatabase.GetCollection<IlmWordOriginModel>("IlmWordOrigin").Find(e => e.IsActive == true).ToList();

            return (from s in OrgData
                    select new IlmWordOriginModel
                    {
                        _id = s._id,
                        Id = s.Id,
                        Name_En = s.Name_En,
                        Name_Hi = s.Name_Hi,
                        Name_Ur = s.Name_Ur,
                        IsActive = s.IsActive,
                        DateCreated = s.DateCreated,
                        DateModified = s.DateModified,
                        CreatedBy = s.CreatedBy,
                        ModifiedBy = s.ModifiedBy,
                        SEO_Slug = s.SEO_Slug
                    }).ToList();
        }

        public List<IlmUserBadgesModel> GetAllUserBadges()
        {
            var BadgesData = _trackerDatabase.GetCollection<IlmUserBadgesModel>("IlmUserBadges").Find(e => e.IsActive == true).ToList();

            return (from s in BadgesData
                    select new IlmUserBadgesModel
                    {
                        _id = s._id,
                        Id = s.Id,
                        SerialNo = s.SerialNo,
                        Descr_En = s.Descr_En,
                        Descr_Hi = s.Descr_Hi,
                        Descr_Ur = s.Descr_Ur,
                        IsActive = s.IsActive,
                        HaveImage = s.HaveImage,
                        ImageName = s.ImageName,
                        DateCreated = s.DateCreated,
                        DateModified = s.DateModified,
                        CreatedBy = s.CreatedBy,
                        ModifiedBy = s.ModifiedBy,
                        SEO_Slug = s.SEO_Slug
                    }).ToList();
        }

        public List<IlmSiteConfigModel> GetAllSiteConfig()
        {
            var ConfigData = _trackerDatabase.GetCollection<IlmSiteConfigModel>("IlmSiteConfig").Find(e => e.IsActive == true).ToList();

            return (from s in ConfigData
                    select new IlmSiteConfigModel
                    {
                        _id = s._id,
                        Id = s.Id,
                        DailyGoal = s.DailyGoal,
                        CorrectAnsMarks = s.CorrectAnsMarks,
                        WrongAnsMarks = s.WrongAnsMarks,
                        WordCompleted = s.WordCompleted,
                        CategoryCompleted = s.CategoryCompleted,
                        SevenDaysStreak = s.SevenDaysStreak,
                        QuizOptions = s.QuizOptions,
                        IsActive = s.IsActive,
                        DateCreated = s.DateCreated,
                        DateModified = s.DateModified,
                        CreatedBy = s.CreatedBy,
                        ModifiedBy = s.ModifiedBy
                    }).ToList();
        }

        public List<ILMQuestionMasterModel> GetQuiz()
        {
            var Question = _trackerDatabase.GetCollection<ILMQuestionMasterModel>("IlmQuestionMaster").Find(e => e.IsActive == true).ToList();

            return (from s in Question
                    select new ILMQuestionMasterModel
                    {
                        _id = s._id,
                        Id = s.Id,
                        CategoryId = s.CategoryId,
                        WordId = s.WordId,
                        Desc_En = s.Desc_En,
                        IsActive = s.IsActive,
                        DateCreated = s.DateCreated,
                        DateModified = s.DateModified,
                        CreatedBy = s.CreatedBy,
                        ModifiedBy = s.ModifiedBy,
                        QuestionOptions = s.QuestionOptions
                    }).ToList();
        }
        public List<ILMQuestionOptionModel> GetQuizOptions()
        {
            var Question = _trackerDatabase.GetCollection<ILMQuestionOptionModel>("IlmQuestionOption").Find(e => e.IsActive == true).ToList();

            return (from s in Question
                    select new ILMQuestionOptionModel
                    {
                        _id = s._id,
                        Id = s.Id,
                        QuestionId = s.QuestionId,
                        Option_En = s.Option_En,
                        Option_Hi = s.Option_Hi,
                        IsActive = s.IsActive,
                        IsCorrect = s.IsCorrect
                    }).ToList();
        }
    }
}