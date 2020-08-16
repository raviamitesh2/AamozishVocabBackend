using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AamozishVocab.Models
{
    [BsonIgnoreExtraElements]
    public class IlmWordModel
    {
        [BsonId]
        public ObjectId _id { get; set; }
        [BsonElement]
        public Guid Id { get; set; }
        [BsonElement]
        public Guid CatgeoryId { get; set; }
        [BsonElement]
        public Nullable<int> SerialNo { get; set; }
        [BsonElement]
        public string Word_En { get; set; }
        [BsonElement]
        public string Word_Hi { get; set; }
        [BsonElement]
        public string Word_Ur { get; set; }
        [BsonElement]
        public string Descr_En { get; set; }
        [BsonElement]
        public string Descr_Hi { get; set; }
        [BsonElement]
        public string Descr_Ur { get; set; }
        [BsonElement]
        public Nullable<System.Guid> Sher { get; set; }
        [BsonElement]
        [AllowHtml]
        public string SherExplanation_En { get; set; }
        [BsonElement]
        [AllowHtml]
        public string SherExplanation_Hi { get; set; }
        [BsonElement]
        [AllowHtml]
        public string SherExplanation_Ur { get; set; }
        [BsonElement]
        [AllowHtml]
        public string SherTranslation_En { get; set; }        
        [BsonElement]
        [AllowHtml]
        public string SherTranslation_Hi { get; set; }
        [BsonElement]
        [AllowHtml]
        public string SherTranslation_Ur { get; set; }
        [BsonElement]
        public string SherAudio { get; set; }
        [BsonElement]
        public Nullable<System.Guid> UsageSher { get; set; }
        [BsonElement]
        [AllowHtml]
        public string UsageSherExplanation_En { get; set; }
        [BsonElement]
        [AllowHtml]
        public string UsageSherExplanation_Hi { get; set; }
        [BsonElement]
        [AllowHtml]
        public string UsageSherExplanation_Ur { get; set; }
        [AllowHtml]
        [BsonElement]
        public string UsageSherTranslation_En { get; set; }
        [BsonElement]
        [AllowHtml]
        public string UsageSherTranslation_Hi { get; set; }
        [BsonElement]
        [AllowHtml]
        public string UsageSherTranslation_Ur { get; set; }
        [BsonElement]
        public string UsageSherAudio { get; set; }
        [BsonElement]
        public Nullable<System.Guid> MoreSher { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherExplanation_En { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherExplanation_Hi { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherExplanation_Ur { get; set; }
        [AllowHtml]
        [BsonElement]
        public string MoreSherTranslation_En { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherTranslation_Hi { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherTranslation_Ur { get; set; }
        [BsonElement]
        public string MoreSherAudio { get; set; }
        [BsonElement]
        public Nullable<System.Guid> MoreSherOther { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherOtherExplanation_En { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherOtherExplanation_Hi { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherOtherExplanation_Ur { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherOtherTranslation_En { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherOtherTranslation_Hi { get; set; }
        [BsonElement]
        [AllowHtml]
        public string MoreSherOtherTranslation_Ur { get; set; }
        [BsonElement]
        public string MoreSherOtherAudio { get; set; }
        [BsonElement]
        public string PartOfSpeech { get; set; }
        [BsonElement]
        public string WordType { get; set; }
        [BsonElement]
        public Nullable<System.Guid> WordRoots { get; set; }
        [BsonElement]
        [AllowHtml]
        public string WordSynonyms { get; set; }
        [BsonElement]
        public string ImageName { get; set; }
        [BsonElement]
        public Nullable<bool> IsActive { get; set; }
        [BsonElement]
        public Nullable<int> HaveImage { get; set; }
        [BsonElement]
        public Nullable<System.DateTime> DateCreated { get; set; }
        [BsonElement]
        public Nullable<System.DateTime> DateModified { get; set; }
        [BsonElement]
        public Nullable<System.Guid> CreatedBy { get; set; }
        [BsonElement]
        public Nullable<System.Guid> ModifiedBy { get; set; }
        [BsonElement]
        public HttpPostedFileBase Image { get; set; }
        [BsonElement]
        public HttpPostedFileBase SherAudioFile { get; set; }
        [BsonElement]
        public HttpPostedFileBase UsgaeSherAudioFile { get; set; }
        [BsonElement]
        public HttpPostedFileBase MoreSherAudioFile { get; set; }
        [BsonElement]
        public HttpPostedFileBase MoreSherOtherAudioFile { get; set; }
        [BsonElement]
        public HttpPostedFileBase WordAudioFile { get; set; }
        [BsonElement]
        public string WordAudio { get; set; }
        [BsonElement]
        public string QuizOptionOne_En { get; set; }
        [BsonElement]
        public string QuizOptionOne_Hi { get; set; }
        [BsonElement]
        public string QuizOptionTwo_En { get; set; }
        [BsonElement]
        public string QuizOptionTwo_Hi { get; set; }
        [BsonElement]
        public string IsCorrect { get; set; }
        [BsonElement]
        public string SEO_Slug { get; set; }
    }
}