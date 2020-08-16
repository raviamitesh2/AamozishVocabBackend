using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AamozishVocab.Models
{
    public class IlmWordOriginModel
    {
        [BsonId]
        public ObjectId _id { get; set; }
        [BsonElement]
        public System.Guid Id { get; set; }
        [BsonElement]
        public string Name_En { get; set; }
        [BsonElement]
        public string Name_Hi { get; set; }
        [BsonElement]
        public string Name_Ur { get; set; }
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
        [BsonElement]
        public string SEO_Slug { get; set; }
    }
}