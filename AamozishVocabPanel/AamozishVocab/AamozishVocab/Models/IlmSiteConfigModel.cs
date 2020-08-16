using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AamozishVocab.Models
{
    public class IlmSiteConfigModel
    {
        [BsonId]
        public ObjectId _id { get; set; }
        [BsonElement]
        public System.Guid Id { get; set; }
        [BsonElement]
        public Nullable<int> DailyGoal { get; set; }
        [BsonElement]
        public Nullable<int> CorrectAnsMarks { get; set; }
        [BsonElement]
        public Nullable<int> WrongAnsMarks { get; set; }
        [BsonElement]
        public Nullable<int> WordCompleted { get; set; }
        [BsonElement]
        public Nullable<int> CategoryCompleted { get; set; }
        [BsonElement]
        public Nullable<int> SevenDaysStreak { get; set; }
        [BsonElement]
        public Nullable<int> QuizOptions { get; set; }
        [BsonElement]
        public Nullable<bool> IsActive { get; set; }
        [BsonElement]
        public Nullable<System.DateTime> DateCreated { get; set; }
        [BsonElement]
        public Nullable<System.DateTime> DateModified { get; set; }
        [BsonElement]
        public Nullable<System.Guid> CreatedBy { get; set; }
        [BsonElement]
        public Nullable<System.Guid> ModifiedBy { get; set; }
    }
}