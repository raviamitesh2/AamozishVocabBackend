using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AamozishVocab.Models
{
    public class ILMQuestionMasterModel
    {
        [BsonId]
        public ObjectId _id { get; set; }
        [BsonElement]
        public System.Guid Id { get; set; }
        [BsonElement]
        public System.Guid CategoryId { get; set; }
        [BsonElement]
        public System.Guid WordId { get; set; }
        [BsonElement]
        public string Desc_En { get; set; }
        [BsonElement]
        public bool IsActive { get; set; }
        [BsonElement]
        public System.DateTime DateCreated { get; set; }
        [BsonElement]
        public System.DateTime DateModified { get; set; }
        [BsonElement]
        public System.Guid CreatedBy { get; set; }
        [BsonElement]
        public System.Guid ModifiedBy { get; set; }
        [BsonElement]
        public List<ILMQuestionOptionModel> QuestionOptions { get; set; } = new List<ILMQuestionOptionModel>();
    }

    public class ILMQuestionOptionModel
    {
        [BsonId]
        public ObjectId _id { get; set; }
        [BsonElement]
        public System.Guid Id { get; set; }
        [BsonElement]
        public System.Guid QuestionId { get; set; }
        [BsonElement]
        public string Option_En { get; set; }
        [BsonElement]
        public string Option_Hi { get; set; }
        [BsonElement]
        public bool IsCorrect { get; set; }
        [BsonElement]
        public bool IsActive { get; set; }
    }
}